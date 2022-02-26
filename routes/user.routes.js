const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();


router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/allusers', userController.users);



module.exports = router;