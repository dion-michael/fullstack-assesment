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

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongodb');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
