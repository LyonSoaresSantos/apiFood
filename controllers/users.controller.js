const UserService = require('../service/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
    console.log('to aqui no controller')
    UserService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    })
}

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    UserService.login({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.users = (req, res, next) => {
    UserService.getUsers(function (error, result) {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    })
}

exports.userProfile = (req, res, next) => {
    const {id} = req.body;
    UserService.getUserById(function (error, result) {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    })
}