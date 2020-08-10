/* Para formatear la moneda debido a que en el API no viene con formato */
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

/* Filtro el detalle del producto */
/* Formateo el precio */
/* Creo las variables amount y decimals debido a que no vienen en la API */
/* Devuevlo el objeto estructurado, con algunos no solicitados para utilizar en el front */
const getItemDetail = item => {

    let price = formatter.format(item.price);
    let array = price.toString();
    array = array.split('.');
    
    const decimals = array[1] ? Number(array[1]) : 0;
    let amount = item.price.toString();
    amount = amount.split('.');
    amount = Number(amount[0]);

    return {
        id: item.id,
        title: item.title,
        category_id: item.category_id,
        price: {
            currency: item.currency_id,
            amount,
            price: item.price,
            price_format: price,
            decimals 
        },
        picture: item.pictures[0].secure_url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
    };
}

/* Busco en el filters del API, las categorias y devuelvo en un arreglo nuevo en caso de existir */
const getCategories = filters => {
    const resp = filters.find(filters => filters.id === 'category');

    if (!resp || resp.length < 1) return [];

    if (resp.values[0].path_from_root.length > 0) {
        const { values } = resp;
        const path_from_root = values[0].path_from_root;
        return path_from_root.map(categorie => categorie.name);
    } else {
        return [];
    }
}

/* Filtro productos de la consulta */
/* Formateo el precio */
/* Creo las variables amount y decimals debido a que no vienen en la API */
/* Devuevlo el objeto estructurado, con algunos no solicitados para utilizar en el front */
const getItems = results => {
    
    let items = [];
    results.map(item => {

        let price = formatter.format(item.price);
        let array = price.toString();
        array = array.split('.');
        
        const decimals = array[1] ? Number(array[1]) : 0;
        let amount = item.price.toString();
        amount = amount.split('.');
        amount = Number(amount[0]);

        items.push({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                price: item.price,
                price_format: price,
                amount,
                decimals
            },
            state_name: item.address.state_name,
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        });
        
    });
    return items.slice(0, 4);
}

/* Devuelvo las categorias en un arreglo nuevo */
const getCategoriesItemDetail = categories => {
    return categories.map(categorie => categorie.name);
}

/* Exporto los modulos para poder utilizarlos */
module.exports = {
    getItemDetail,
    getCategories,
    getItems,
    getCategoriesItemDetail
}