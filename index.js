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
const productRoutes = require('./routes/product.routes');


//Creating and Invoking Api/Server Web from Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(errors.errorHandler);


//config of unless
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/api/user/register", methods: ['POST'] },
            { url: "/api/user/login", methods: ['POST'] },
            // { url: "/api/product/register", methods: ['POST'] },
            // { url: "/api/product/", methods: ['GET'] },
            // { url: "/api/product/:id", methods: ['GET'] },
        ],
    })
)

//config of routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

module.exports = app;