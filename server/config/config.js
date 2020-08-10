//  ======================
//  Puerto
//  ======================
process.env.PORT = process.env.PORT || 3000;

process.env.URL_BASE = process.env.URL_BASE || 'http://localhost:' + process.env.PORT;

//  ======================
//  Entorno
//  ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  ======================
//  URL API Base mercadolibre
//  ======================
process.env.URL_API = 'https://api.mercadolibre.com';

process.env.AUTHOR = JSON.stringify({
    name: 'Richard Jose',
    lastname: 'Rojas Salazar'
});
