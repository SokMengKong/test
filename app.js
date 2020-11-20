const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')
const foodRoute = require('./Routes/food.route')  // the same as ot dak ./

// init express app
const app = express()


app.set('view engine', 'ejs')


app.use(express.urlencoded()) // this middle will convert user post req to js object in req.body




const dbURI = 'mongodb://localhost:27017/circle-plate'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( () => {
        console.log("connected to moogodb");
        app.listen(3000, () => (console.log('listen to req on port 3000')))
    })
    .catch( (err) => {
        console.log(err);
    })








app.get('/', (req, res) => {
    res.render('index', {data: "from app.js"})
})


app.use('/user', userRoute)
app.use('/food', foodRoute)