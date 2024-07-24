const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./errorHandler');

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.use(errorHandler);

const env = process.env.NODE_ENV;

const start = async () => {
  try {
    await mongoose.connect(
      env === 'TEST' ? process.env.MONGO_TEST_URI : process.env.MONGO_URI
    );
    console.log('connected to mongodb');
    app.listen(process.env.port || 3001, () => {
      console.log(`Server started on port ${process.env.port || 3001}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

module.exports = app;
