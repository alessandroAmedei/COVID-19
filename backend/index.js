const express = require('express')
const mongoose = require('mongoose')

const app = express();

const andamento_nazionale_router = require('./api/andamento_nazionale/db');

app.get('/api',(req,res)=>{
    res.send('Benvenuti in questa REST API per la pandemia di COVID-19 in Italia. I dati sono ottenuti ogni giorno verso le 18.30 circa dalla Protezione Civile, FORZA ITALIA!')
})

app.use('/api',andamento_nazionale_router);

//IMPORTANTE MIDDLEWARE
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true); questo non ci serve per ora

    // Pass to next layer of middleware
    next();
});


const port = process.env.PORT || 5000;

app.listen(port,(err)=>{
    console.log('app is running on port: ',port);
})

