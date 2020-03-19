const express = require('express')
const mongoose = require('mongoose')

const app = express();

const andamento_nazionale_router = require('./api/andamento_nazionale/db');

app.get('/api',(req,res)=>{
    res.send('Benvenuti in questa REST API per la pandemia di COVID-19 in Italia. I dati sono ottenuti ogni giorno verso le 18.30 circa dalla Protezione Civile, FORZA ITALIA!')
})

app.use('/api',andamento_nazionale_router);



app.listen(5000,(err)=>{
    console.log('app is running on port 5000')
})

