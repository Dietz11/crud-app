const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new to-do item
router.post('/', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// Get all to-do items
router.get('/', (req, res) => {
  Todo.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// Update a to-do item
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  Todo.findByIdAndUpdate(id, updates, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// Delete a to-do item
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

module.exports = router;
