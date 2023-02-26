const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Counter = require('./models/counter');
const counterRoutes = require('./routes/counterRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// http://localhost:3000/ replacement for '*'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/counter', async (req, res) => {
  try {
    const counter = await Counter.findOne();
    if (!counter) {
      throw new Error('No counter found');
    }
    res.json(counter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.json());

app.use('/api', counterRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    const counter = await Counter.findOne();
    if (!counter) {
      console.log('Creating new counter document...');
      await Counter.create({ count: 0 });
    }
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
    
  })
  .catch((err) => console.error(err));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

app.get('/', (req, res) => { res.send('Hello from Express!')});