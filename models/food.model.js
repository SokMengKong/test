const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

// create model

const Food = mongoose.model('food', foodSchema)


// export food model
module.exports = Food