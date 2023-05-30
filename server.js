const express = require('express');
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());


let users = [
    {
        id: 1,
        name: "Kim",
        favouriteMovies: []
    },
    {
        id: 2,
        name: "Joe",
        favouriteMovies: []
    }
]

let movies = [

]

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name){
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})

//Update
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updateUser = req.body;

    let user = user.find( user => user.id == id );

    if (user){
        user.name = updateUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

//Create
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = user.find( user => user.id == id );

    if (user){
        user.favouriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
    } else {
        res.status(400).send('no such user')
    }
})

//Delete
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = user.find( user => user.id == id );

    if (user){
        user.favouriteMovies = user/favouriteMovies.filter( title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from users ${id}'s array`);;
    } else {
        res.status(400).send('no such user')
    }
})

//Delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = user.find( user => user.id == id );

    if (user){
        user = user.filter( user => user.id != id );
        res.status(200).send(`user ${id} has been deleted`);;
    } else {
        res.status(400).send('no such user')
    }
})

//READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movieTitle === title );


    if (movie) {
        res.status(200).json(movie);
    } else{
        res.status(400).send("no such movie")
    }
})

//READ
app.get('/movies/genre/:genreName/', (req, res) => {
    const { title } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName) .Genre;

    if (genre) {
        res.status(200).json(genre);
    } else{
        res.status(400).send("no such genre")
    }
})

//READ
app.get('/movies/directors/:directorName/', (req, res) => {
    const { directorName } = req.params;
    const directors = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else{
        res.status(400).send("no such director")
    }
})



app.listen(8080, () => console.log("listening on 8080"))