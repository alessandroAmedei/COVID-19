const express = require('express');
const mongoose = require('mongoose');
const db = require('../db/db');

const counter_schema = new mongoose.Schema({
  _id: String,
  counter: Number
});

const counter_model = mongoose.model('counter', counter_schema);

module.exports = counter_model;