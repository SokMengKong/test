const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')


const app = express()


app.set('view engine', 'ejs')

app.use(express.urlencoded())



const dbURI = process.env.db || 'mongodb://localhost:27017/CIRCLE_PLATE';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( () => {
        console.log("connected to moogodb");
        app.listen(process.env.port || 3000, () => (console.log('listen to req on port 3000')))
    })
    .catch( (err) => {
        console.log(err);
    })

    app.get('/', (req, res) => {
        res.render('index',{data:"from app.js" })
    })


    app.use('/user', userRoute)