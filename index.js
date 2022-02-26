const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const variables = require('./configuration/variables');

//routers


//Creating and Invoking Api/Server Web from Express
const app = express();

app.use(cors());

//parse of Json config
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

//config of routes

module.exports = app;