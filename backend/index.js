const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`.yellow.bold)
  );