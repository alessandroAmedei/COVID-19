/*
Controller andamento nazionale
data: YYYY-MM-DD
*/

const express = require('express');
const mongoose = require('mongoose');
const db = require('../db/db');


const router = express.Router();

const andamento_nazionale_schema = new mongoose.Schema({
    data: String,
    stato: String,
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

const andamento_nazionale_model = mongoose.model('andamento_nazionale', andamento_nazionale_schema);

router.get('/andamento_nazionale', (req, res) => {
    andamento_nazionale_model.find({}, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data);
    });
});

router.get('/andamento_nazionale/:data', (req, res) => {
    const _data = req.params.data
    //USING REGEX AS LIKE OPERATOR IN SQL! --> Data contains time and hour, hour is not always 18:00:00
    andamento_nazionale_model.find({ data: { $regex: _data + '.*' } }, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data);
    });
});

module.exports = router;