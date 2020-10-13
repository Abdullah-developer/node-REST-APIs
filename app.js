const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const app  = express();

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

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