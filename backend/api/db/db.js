const express = require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.db_link, { useNewUrlParser: true,useUnifiedTopology: true  });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("connected to db!");
});

module.exports = db;