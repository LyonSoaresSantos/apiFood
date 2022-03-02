const db = require('../configuration/db');
const auth = require('../middlewares/auth');

async function register(params, callback) {
    if (params.name === undefined) {
        return callback({ message: "Name Required" });
    }

    if (params.description === undefined) {
        return callback({ message: "Descripition Required" });
    }

    if (params.price === undefined) {
        return callback({ message: "Price Required" });
    }

    if (params.status === undefined) {
        return callback({ message: "Status Required" });
    }

    if (params.promotion === undefined) {
        return callback({ message: "Promotion Required" });
    }

    if (params.oldprice === undefined) {
        return callback({ message: "Old Price Required" });
    }

    if (params.restaurantid === undefined) {
        return callback({ message: "RestaurantId Required" });
    }
    if (params.categoryid === undefined) {
        return callback({ message: "CategoryId Required" });
    }

    const [id] = await db('products').insert({
        name: params.name,
        description: params.description,
        price: params.price,
        status: params.status,
        promotion: params.promotion,
        oldprice: params.oldprice,
        restaurantid: params.restaurantid,
        categoryid: params.categoryid,
        imagepath: params.imagepath,
    })
        .returning('id');
    const resultado = await db.select('id').from('products').where(id).first();;

    return callback(null, resultado);
}

async function getProducts(callback) {
    const result = await db.select().from('products').timeout(1000, { cancel: true });
    return callback(null, result);
}

async function getProductbyId(id, callback) {
    const result = await db.select()
        .from('products as p')
        .where({ id: id })
        .orderBy('p.name');
    return callback(null, result);
}

module.exports = {
    register,
    getProducts,
    getProductbyId
}