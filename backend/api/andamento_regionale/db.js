const express = require('express');
const mongoose = require('mongoose');
//mongoose.connect('mongodb+srv://alessandroAmedei:Comunione1987*@cluster0-oo3ie.mongodb.net/covid-19?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = require('../db/db');

const router = express.Router();

const andamento_regionale_schema = new mongoose.Schema({
    data: String,
    stato: String,
    codice_regione: Number,
    denominazione_regione: String,
    lat: Number,
    long: Number,
    ricoverati_con_sintomi: Number,
    terapia_intensiva: Number,
    totale_ospedalizzati: Number,
    isolamento_domiciliare: Number,
    totale_attualmente_positivi: Number,
    nuovi_attualmente_positivi: Number,
    dimessi_guariti: Number,
    deceduti: Number,
    totale_casi: Number,
    tamponi: Number
});

const andamento_regionale_model = mongoose.model('andamento_regionale', andamento_regionale_schema);

router.get('/andamento_regionale').sort('data').exec((req, res) => {
    andamento_regionale_model.find({}, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data);
    });
});

router.get('/andamento_regionale/:regione', (req, res) => {
    const _data = req.params.regione;
    andamento_regionale_model.find({ denominazione_regione: _data }, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data);
    });
});

router.get('/andamento_regionale/:data', (req, res) => {
    const _data = req.params.data
    //USING REGEX AS LIKE OPERATOR IN SQL! --> Data contains time and hour, hour is not always 18:00:00
    andamento_regionale_model.find({ data: { $regex: _data + '.*' } }, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data);
    });
});

module.exports = router;