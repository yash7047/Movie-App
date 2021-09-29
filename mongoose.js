const mongoose = require('mongoose')
//const db_port = process.env.url || 'mongodb://localhost:27017/movie-app'

const db_port = 'mongodb+srv://yash_7047:Yash@1234@cluster0.mqwds.mongodb.net/movie?retryWrites=true&w=majority'

mongoose.connect(db_port,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
