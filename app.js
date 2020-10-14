const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const app  = express();

const fileStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'images');
    },
    filename: function(req, file, callback) {
        callback(null, uuidv4())
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}


app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allowed-Origin', '*')
    res.setHeader('Acces-Control-Allowed-Methods', 'POST, GET, PUT, DELETE, PATCH')
    res.setHeader('Acces-Control-Allowed-Headers', 'Content-Type, Authorization')
    next()
})

const feedRoutes = require('./routes/feed')

app.use('/feed', feedRoutes)

// middleware for handling the error
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
})

mongoose.connect('mongodb+srv://abdullah:07707908625@nodejs-cyldb.gcp.mongodb.net/Blog',
    { useNewUrlParser: true, useUnifiedTopology: true }).then( _ => {
        app.listen(8080)
    }).catch(err => console.log(err))