const express = require('express')
const foodController = require('../controllers/food.controller')

// init router
const Router = express.Router();


Router.get('/', foodController.view_all_get)
Router.get('/add', foodController.add_get)
Router.post('/add', foodController.add_post)




// export all route
module.exports = Router