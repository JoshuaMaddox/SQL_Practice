// LOAD ENV VARIABLES
require('dotenv').config({ silent: true });

// SET SERVER PORT
const PORT = process.env.PORT || 8000;

// REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// APP DECLARATION
const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// ROUTES
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  let filepath = path.resolve('index.html');
  res.sendFile(filepath);
});

// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
