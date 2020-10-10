const express = require('express')
const bodyParser = require('body-parser')

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
app.listen(8080)