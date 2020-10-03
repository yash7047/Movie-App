const mongoose=require('mongoose')
const db_port = process.env.url || 'mongodb://localhost:27017/movie-app'
mongoose.connect(db_port,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})