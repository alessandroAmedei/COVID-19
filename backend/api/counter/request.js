const express = require('express');
const mongoose = require('mongoose');
const db = require('../db/db');

const request_schema = new mongoose.Schema({
  counter: Number,
  ip_address: String,
  url: String,
  date: String
});

const request_model = mongoose.model('request', request_schema);

module.exports = request_model;