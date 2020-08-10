const express = require('express');
const axios = require('axios');
const { getItemDetail, getCategoriesItemDetail } = require('../helpers/helpers');
const app = express();
require('../config/config');

/* Traer detalle del producto */
app.get('/api/items/:id', async (req, res) => { 
    /* Utilizo el tryCatch para capturar errores */
    try {
        
        /* Leo el parametro de la url */
        let id = req.params.id;

        /* Creo las URLs */
        const urlItem = `${process.env.URL_API}/items/${id}`;
        const urlItemDescription = `${process.env.URL_API}/items/${id}/description`;

        /* Por medio de axios traigo los datos de la API y con el await espero que cargue para continuar */
        const {data: dataItem} = await axios.get(urlItem);
        const {data: {plain_text}} = await axios.get(urlItemDescription);
        
        /* Llamo al helper para traer la data filtrada */
        let item = getItemDetail(dataItem);
        /* Agregado la descripcion al objeto item */
        item.description = plain_text;

        /* Con el category_id del item llamo al API de categorias para luego devolverla y pintar el breadcrumb en front */
        const urlItemCategories = `${process.env.URL_API}/categories/${item.category_id}`;
        const {data: {path_from_root}} = await axios.get(urlItemCategories);

        /* Llamo al helper para filtrar las categorias en un arreglo */
        let categories = getCategoriesItemDetail(path_from_root);
        
        /* Devuelvo con estatus 200 el JSON */
        /* Author viene de la configuracion */
        res.status(200).json({
            author: JSON.parse(process.env.AUTHOR),
            item,
            categories
        });

    } catch (error) {
        /* Error 500 en dado caso que exista un error */
        res.status(500).json(error);
    }
});

module.exports = app;