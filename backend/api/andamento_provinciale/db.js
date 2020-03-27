const express = require('express');
const mongoose = require('mongoose');
const db = require('../db/db');

const router = express.Router();

const andamento_provinciale_schema = new mongoose.Schema({
    data: String,
    stato: String,
    codice_regione: Number,
    denominazione_regione: String,
    codice_provincia: Number,
    denominazione_provincia: String,
    signla_provincia: String,
    lat: Number,
    long: Number,
    totale_casi: Number
});
const andamento_provinciale_model = mongoose.model('andamento_provinciale', andamento_provinciale_schema);

router.get('/andamento_provinciale', (req, res) => {
    andamento_provinciale_model.find({}, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data);
    });
});

module.exports = router;