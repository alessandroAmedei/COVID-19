const express = require('express')
const mongoose = require('mongoose')

const app = express();

const andamento_nazionale_router = require('./api/andamento_nazionale/db');
const andamento_regionale_router = require('./api/andamento_regionale/db');
const counter_model = require('./api/counter/counter');

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

app.use(function (req, res, next) {

    console.log(req.url);
    if (req.url === '/api/') {
        next();
        return;
    }
    counter_model.findById({ _id: 'justone' }, (err, counter) => {

        counter.counter = counter.counter + 1;
        counter.save(() => {
            console.log('Request. n (could be duplicate)', counter.counter);
        });
    });
    next();
});

app.get('/api', (req, res) => {
    counter_model.findById({ _id: 'justone' }, (err, counter) => {
        res.send('Benvenuti in questa REST API per la pandemia di COVID-19 in Italia. I dati sono ottenuti ogni giorno verso le 18.30 circa dalla Protezione Civile, FORZA ITALIA! c:' + counter.counter);
    });

})

app.use('/api', andamento_nazionale_router);

app.use('/api', andamento_regionale_router);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    console.log('app is running on port: ', port);
})

