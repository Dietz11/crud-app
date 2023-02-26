const express = require('express');
const Counter = require('../models/counter');

const router = express.Router();

// define routes for CRUD operations
router.get('/counter', async (req, res) => {
  console.log('Received GET request to /counter');
  try {
    console.log('Finding counter document...');
    const counter = await Counter.findOne();
    res.send(counter);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/counter', async (req, res) => {
  console.log('Received PUT request to /counter');
  try {
    const counter = await Counter.findOne();
    counter.count = req.body.count;
    await counter.save();
    console.log('Counter document saved:', counter);
    res.send(counter);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
