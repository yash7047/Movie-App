const mongoose = require('mongoose')
const validator = require('validator')

const movieSchema = new mongoose.Schema({
    _id: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Comment"
        }
    ]
})

const Movie = mongoose.model('movies', movieSchema)

module.exports = Movie