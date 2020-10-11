const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app  = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allowed-Origin', '*')
    res.setHeader('Acces-Control-Allowed-Methods', 'POST, GET, PUT, DELETE, PATCH')
    res.setHeader('Acces-Control-Allowed-Headers', 'Content-Type, Authorization')
    next()
})

const feedRoutes = require('./routes/feed')

app.use('/feed', feedRoutes)

mongoose.connect('mongodb+srv://abdullah:07707908625@nodejs-cyldb.gcp.mongodb.net/Blog',
    { useNewUrlParser: true, useUnifiedTopology: true }).then( _ => {
        app.listen(8080)
    }).catch(err => console.log(err))