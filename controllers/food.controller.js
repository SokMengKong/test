
const Food = require('../models/food.model')

const add_get = (req, res) => {
    res.render('food/create')
};
const add_post = (req, res) => {
    Food.create({
        name: req.body.name,
        price: req.body.price
    })
        .then( () => res.redirect('/'))
        .catch(err => console.log(err))

};



const view_all_get = (req, res) => {
    Food.find()
        .then( data => {
            res.render('food/allfoods', {allFood: data})
        })
        .catch(err => console.log(err))
}




module.exports = {
    add_post,
    add_get,
    view_all_get
}