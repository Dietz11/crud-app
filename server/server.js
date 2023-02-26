const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set up body parser middleware
app.use(bodyParser.json());

// Enable cross-origin resource sharing
app.use(cors());

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Set up API routes
const todoRoutes = require('./routes/todo');
app.use('/api/todo', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
