const ProductService = require('../service/product')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
    ProductService.register(req.body, (error, result) => {
        if (error) {
            console.log(req.body)
            return res.status(500).send({
                message: error.message
            })
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    })
}


exports.products = (req, res, next) => {
    ProductService.getProducts(function (error, result) {
        if (error) {
            return res.status(500).send({
                error: error.message
            })
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    })
}

exports.productById = (req, res, next) => {
    const { id } = req.body;
    ProductService.getProductbyId(function (error, result) {
        if (error) {
            return res.status(500).send({
                error: error.message
            })
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    })
}