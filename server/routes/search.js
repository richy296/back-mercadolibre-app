const express = require('express');
const axios = require('axios');
const { getCategories, getItems } = require('../helpers/helpers');
const app = express();
require('../config/config');

/* Traer resultatados de busqueda */
app.get('/api/items' , async (req, res) => { 
    
    /* Utilizo el tryCatch para capturar errores */
    try{
        /* Leo el parametro de la url */
        const q = req.query.q;

        /* Creo las URLs */
        const url = `${process.env.URL_API}/sites/MLA/search?q=${encodeURI(q)}`;

        /* Por medio de axios traigo los datos de la API y con el await espero que cargue para continuar */
        const {data: {filters, results}} = await axios.get(url);

        /* Llamo a los helpers para traer la data filtrada */
        const categories = getCategories(filters);
        const items = getItems(results);
        
        /* Devuelvo con estatus 200 el JSON */
        /* Author viene de la configuracion */
        res.status(200).json({
            author: JSON.parse(process.env.AUTHOR),
            categories,
            items
        });

    } catch (error) {
        /* Error 500 en dado caso que exista un error */
        res.status(500).json(error);
    }
});

module.exports = app;