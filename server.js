'use strict'

const app = require('./bin/express')
const variables = require('./bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Api inicialized with success on port ${variables.Api.port}`);
})