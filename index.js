const express = require('express');
const request = require('request');
const path = require('path');

const port = 3000;
const app = express();

const view_path = path.join(__dirname, 'views')
const public_path = path.join(__dirname, 'public')

app.set('view engine', 'ejs');
app.set('views', view_path);

app.use(express.static(public_path));

app.get('/', (req,res) =>{
   res.render('index');
});

app.get('/results', (req,res) =>{
    var query = req.query.search;
    var url = `http://www.omdbapi.com/?s=${query}&apikey=3db01401`;
    request(url,(error, response, body) =>{
       if(!error && response.statusCode === 200){
           var data = JSON.parse(body);
           res.render('result', {data: data});
       } else{
           console.log(error);
           console.log(response.statusCode);
       }
    });
});

app.listen(port, () =>{
    console.log(`Server started at http://127.0.0.1:${port}`);
})