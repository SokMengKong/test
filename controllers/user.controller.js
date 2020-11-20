const User = require('../models/user.model')


const user_create_get = (req, res) => {
    res.render('user/create')
}

const user_create_post = (req, res) => {
    // console.log(req.body);
    const newUser = req.body
    User.create({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
    })
        .then( () => {
            User.find()
            .then( data => {
                res.render('user/allusers', {allUser: data})
            })
            .catch(err => console.log(err))

        })
        .catch( err => console.log(err))
}


module.exports = {
    user_create_get,
    user_create_post
}