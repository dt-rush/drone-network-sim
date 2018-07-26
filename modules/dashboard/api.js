// create the api router and request handlers
const express = require('express');
const router = express.Router();

const shared = require('./shared.js');
const db = shared.db;
const config = shared.config;

// get all drones
router.get('/drones', (req, res) => {
  db.find('drones').then(drones => res.send(drones));
});

// get the city from the config
router.get('/city', (req, res) => {
  res.send(config.city); 
});

module.exports = router;
