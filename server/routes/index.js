const express = require('express');
const app = express();

/* Rutas de los endpoints */
app.use(require('./search'));
app.use(require('./product'));

module.exports = app;
