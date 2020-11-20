const express = require('express')

const userController = require('../controllers/user.controller')

const Router = express.Router()

Router.get('/signup', userController.user_create_get)
Router.post('/signup', userController.user_create_post)


module.exports = Router