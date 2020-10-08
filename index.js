const express = require('express');
const request = require('request');
const path = require('path');
const Movie = require('./model.js');
const Comment = require('./comment_modal.js');
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
    {
        title: 'Enola Holmes',
        image: 'https://m.media-amazon.com/images/M/MV5BZjNkNzk0ZjEtM2M1ZC00MmMxLTlmOWEtNWRlZTc1ZTUyNzY4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg',
        plot: " When Enola Holmes-Sherlock's teen sister-discovers her mother missing, she sets off to find her, becoming a super-sleuth in her own right as she outwits her famous brother and unravels a dangerous conspiracy around a mysterious young Lord."
    },
    {
        title: 'Tenet',
        image: 'https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg',
        plot: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time."
    },
    {
        title: 'The New Mutants',
        image: 'https://m.media-amazon.com/images/M/MV5BZDQ2NTdmNDgtMGIwMS00ODE2LTk5M2EtZGZhYzc4MWRlNTU3XkEyXkFqcGdeQXVyNTc4MjczMTM@._V1_SX300.jpg',
        plot: "Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves."
    },
    {
        title: 'Mulan',
        image: 'https://m.media-amazon.com/images/M/MV5BNDliY2E1MjUtNzZkOS00MzJlLTgyOGEtZDg4MTI1NzZkMTBhXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SX300.jpg',
        plot: "A young Chinese maiden disguises herself as a male warrior in order to save her father."
    },
    {
        title: 'Ava',
        image: 'https://m.media-amazon.com/images/M/MV5BMTMzMTg1MjgtOWNhYy00NmZmLWExOTctMjA2OTZhZDFkNDhhXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
        plot: "Ava is a deadly assassin who works for a black ops organization, traveling the globe specializing in high profile hits. When a job goes dangerously wrong she is forced to fight for her own survival."
    },
    {
        title: 'Rogue',
        image: 'https://m.media-amazon.com/images/M/MV5BZWUyY2M2M2UtMGI1NC00ZjBmLWI5NDItYjQ1MThjNzgwMjhmXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg',
        plot: "O'Hara is a mercenary leading a squad of soldiers on their mission to rescue hostages in remote part of Africa. Unfortunately the mission goes wrong and the team are stranded, forced to survive against the local rebels."
    },
];

var recommend = [
    {
        title: 'Interstellar',
        image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        title: 'Inception',
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        title: 'The Dark Knight',
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        title: 'Harry Potter and the Deathly Hollows: Part 2',
        image: 'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
        plot: "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts."
    },
    {
        title: 'Avengers: Infinity War',
        image: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
        plot: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe."
    }
];

app.get('/', (req, res) => {
    res.render('index',{trend: trend, recommend: recommend});
});

app.get('/search', (req, res) => {
    var query = req.query.search;
    var url = `http://www.omdbapi.com/?s=${query}&apikey=3db01401`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render('search', {data: data});
        } else {
            console.log(error);
            console.log(response.statusCode);
        }
    });

});

app.get('/search/:id',(req,res)=>{
    Movie.findById(req.params.id).populate("comments").exec(function(err,mov){
        if(err) console.log(err);
        else{
            var query = req.params.id;
            var url = `http://www.omdbapi.com/?i=${query}&apikey=3db01401`;
            request(url,function(error, response, body){
                if(!error && response.statusCode === 200){
                    var movie = JSON.parse(body);
                    res.render('result',{movie: movie, mov: mov});
                } else {
                    console.log(error);
                    console.log(response.statusCode);
                }
            });
        }
    });
});

app.post("/search/:id",(req,res)=>{
    Movie.exists({_id: req.body.movie_id},function(err,result){
       if(err) throw err;
       if(result) {
           Movie.findById(req.params.id).populate("comments").exec(function(err,movie){
               if(err) throw err;
               Comment.create({username: req.body.username,comment: req.body.comment},function(err,com){
                   if(err) throw err;
                   com.save();
                   movie.comments.push(com);
                   movie.save();
                   //console.log(movie);
               });
               res.redirect('back');
           });
       } else {
           Movie.create({_id: req.body.movie_id} ,function(err,movie){
               if(err) throw err;
               var temp = {username: req.body.username,comment: req.body.comment};
               Comment.create(temp ,function(err,com){
                   if(err) throw err;
                   com.save();
                   movie.comments.push(com);
                   movie.save();
                   //console.log(movie);
               });
               res.redirect('back');
           });
       }

    });
});

app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
})