


const user_create_get = (req, res) => {
    res.render('create')
}

const user_create_post = (req, res) => {
   console.log(req.body)
}


module.exports = {
    user_create_get,
    user_create_post
}