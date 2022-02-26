const db = require('../config/db');
const bcrypt = require("bcrypt");
const auth = require('../middlewares/auth');

async function login({ email, password }, callback) {
    const data = await db.select().from('users').where({ email: email })
    if (data.length <= 0) {
        return callback({
            message: "Invalid Username/Password!",
        });
    } else {
        if (bcrypt.compareSync(password, data[0].password)) {
            const token = auth.generateAccessToken(email);
            return callback(null, { token });
        } else {
            return callback({
                message: "Invalid Username/Password!",
            });
        }
    }
}

async function register(params, callback) {
    if (params.name === undefined) {
        return callback({ message: "Name Required" });
    }

    if (params.email === undefined) {
        return callback({ message: "Email Required" });
    }

    if (params.address === undefined) {
        return callback({ message: "Address Required" });
    }

    if (params.county === undefined) {
        return callback({ message: "County Required" });
    }

    if (params.password === undefined) {
        return callback({ message: "Password Required" });
    }

    if (params.passwordconfirmation === undefined) {
        return callback({ message: "Password Confirmation Required" });
    }

    const data = await db.select().from('users').where({ email: params.email })
    if (data.length >= 1) {
        return callback({
            message: "Email already exist!",
        });
    } else {
        [params.email, params.name, params.password, params.passwordconfirmation, params.imagepath, params.address, params.county]
        const salt = bcrypt.genSaltSync();
        const [id] = await db('users').insert({
            email: params.email,
            name: params.name,
            address: params.address,
            password: bcrypt.hashSync(params.password, salt),
            imagepath: params.imagepath,
            county: params.county
        })
            .returning('id');
        const resultado = await db.select().from('users').where({ id: id }).first();;

        return callback(null, resultado);
    }
}

async function getUsers(callback) {
    const result = await db.select().from('users').timeout(1000, { cancel: true });
    return callback(null, result);
}

// async function getUserById(id, callback) {
//     console.log(id)
//     const result = await db.select('us.id' , 'us.email', 'us.nick', 'us.name', 'us.status', 'lg.id', 'lg.title')
//     .from('users as us')
//     .leftJoin('users_leagues as ul', 'us.id', 'ul.userid')
//     .leftJoin('leagues as lg', 'ul.leagueid', 'lg.id')
//     .where({ leagueid: id, 'us.status': '1'})
//     .orderBy('us.nick');
//     return callback(null, result);
// }

async function getUserById(id, callback) {
    console.log(id)
    const result = await db.select()
        .from('users as us')
        .where({ id: id })
        .orderBy('us.name');
    return callback(null, result);
}

module.exports = {
    login,
    register,
    getUsers,
    getUserById
}