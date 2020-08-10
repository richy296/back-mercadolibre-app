const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// CORS
const optionsCors = {
  origin: ['http://localhost:3001'],
  methods: 'GET,OPTIONS,PUT,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  preflightContinue: false
};

app.use(cors(optionsCors));

//Configuracion global de rutas
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);
});