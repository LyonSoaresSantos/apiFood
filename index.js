require("dotenv").config();
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
// const variables = require('./configuration/variables');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const unless = require("express-unless");

//import routes
const userRoutes = require('./routes/user.routes');


//Creating and Invoking Api/Server Web from Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(errors.errorHandler);

//parse of Json config
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

//config of unless
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/api/user/register", methods: ['POST'] },
            { url: "/api/user/login", methods: ['POST'] },
        ],
    })
)

//config of routes
app.use('/api/user', userRoutes);

module.exports = app;