const mongoose=require('mongoose')
const validator=require('validator')

const movieSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true,
    },
    comment:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    }
})

const Movie=mongoose.model('movies',movieSchema)

module.exports=Movie