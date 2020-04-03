const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();

// Use JSON middleware
app.use(express.json());

// Use cookie-parser
app.use(cookieParser());

// Set security HTTP headers
app.use(helmet());

// Set dist files as static files
//app.use(express.static(path.resolve(__dirname, '../dist')));

module.exports = app;
