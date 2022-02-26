'use strict'

const app = require('./index')
const variables = require('./configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Api inicialized with success on port ${variables.Api.port}`);
})