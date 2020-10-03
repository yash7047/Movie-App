const express = require('express');
const request = require('request');
const path = require('path');
const Movie = require('./model.js');
const { render } = require('ejs');
const { isValidObjectId } = require('mongoose');

require('./mongoose.js');

var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const port = process.env.PORT || 3000;

const view_path = path.join(__dirname, 'views')
const public_path = path.join(__dirname, 'public')

app.set('view engine', 'ejs');
app.set('views', view_path);

app.use(express.static(public_path));

var trend = [
    {title: 'Enola Holmes', image: 'https://m.media-amazon.com/images/M/MV5BZjNkNzk0ZjEtM2M1ZC00MmMxLTlmOWEtNWRlZTc1ZTUyNzY4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg'},
    {title: 'Tenet', image: 'https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg'},
    {title: 'The New Mutants', image: 'https://m.media-amazon.com/images/M/MV5BZDQ2NTdmNDgtMGIwMS00ODE2LTk5M2EtZGZhYzc4MWRlNTU3XkEyXkFqcGdeQXVyNTc4MjczMTM@._V1_SX300.jpg'},
    {title: 'Mulan', image: 'https://m.media-amazon.com/images/M/MV5BNDliY2E1MjUtNzZkOS00MzJlLTgyOGEtZDg4MTI1NzZkMTBhXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SX300.jpg'},
    {title: 'Ava', image: 'https://m.media-amazon.com/images/M/MV5BMTMzMTg1MjgtOWNhYy00NmZmLWExOTctMjA2OTZhZDFkNDhhXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg'},
    {title: 'Rogue', image: 'https://m.media-amazon.com/images/M/MV5BZWUyY2M2M2UtMGI1NC00ZjBmLWI5NDItYjQ1MThjNzgwMjhmXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg'},
];

var recommend = [
    {title: 'Interstellar', image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'},
    {title: 'Inception', image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'},
    {title: 'The Dark Knight', image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'},
    {title: 'Harry Potter and the Deathly Hollows: Part 2', image: 'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg'},
    {title: 'Avengers: Infinity War', image: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg'}
];

app.get('/', (req, res) => {
    res.render('index',{trend: trend, recommend: recommend});
});



app.get('/results', (req, res) => {
    var query = req.query.search;
    var url = `http://www.omdbapi.com/?t=${query}&apikey=3db01401`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render('result', {
                data: data
            });
        } else {
            console.log(error);
            console.log(response.statusCode);
        }
    });

});

app.post("/do-comment", (req, res) => {
    var data = req.body;
    console.log(data);
    res.send(data);
})

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
})