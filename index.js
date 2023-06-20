const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const { update } = require('lodash');
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/nfDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  {
    _id: 1,
    Username: 'Dliv',
    Password: 'Dliv1',
    Email: 'Dlivisthegoat@gmail.com',
    Birthday: ("1989-03-23T00:00:00.000Z")
  },
  {
    _id: 3,
    Username: 'Jeffawee',
    Password: 'Jeffiscool',
    Email: 'jeffawee@gmail.com',
    Birthday: ("1990-02-02T00:00:00.000Z"),
    FavouriteMovies: [ ]
  },
  {
    _id: 4,
    Username: 'Nashyboy',
    Password: 'ILOVEROCKS',
    Email: 'Nashyboy@gmail.com',
    Birthday: ("2019-02-13T00:00:00.000Z")
  },
  {
    _id: ("648b6e93c193c47998e76985"),
    Username: 'Opiebear',
    Password: 'Ilovenaps',
    Email: 'Chillsenor@gmail.com',
    Birthday: ("2018-02-28T00:00:00.000Z")
  }
];

let movies = [
{
  _id: ("6488d8b8f35940600868528d"),
  Title: 'Silence of the Lambs',
  Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
  Genre: {
    Name: 'Thriller',
    Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
  },
  Director: {
    Name: 'Jonathan Demme',
    Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
    Birth: '1944',
    Death: '2017'
  },
  ImagePath: 'silenceofthelambs.png',
  Featured: true
},
{
  _id: ("648a25b28d925836d83d5c21"),
  Title: 'Step Brothers',
  Description: 'Two 40 year old losers are forced to become roommates when their parents marry eachother,',
  Genre: {
    Name: 'Comedy',
    Description: 'Movies intended to elicit laughter.'
  },
  Director: 'Adam Mckay',
  ImagePath: 'Stepbrothers.png',
  Featured: true,
  Bio: [ 'Adam McKay is an american director.' ]
},
{
  _id: ("648a27ba8d925836d83d5c22"),
  Title: 'Anchorman',
  Description: 'In the 1970s, an anchormans stint as San Diegos top rated newsreader is challenged when an ambitious newswoman becomes his co-anchor.',
  Genre: {
    Name: 'Comedy',
    Description: 'Movies intended to elicit laughter.'
  },
  Director: {
    Name: 'Adam Mckay',
    Bio: 'Adam Mckay is an american director.',
    Birth: '1973'
  },
  ImagePath: 'anchorman.png',
  Featured: true
},
{
  _id: ("648b59618d925836d83d5c23"),
  Title: 'Superbad',
  Description: 'Two codependent high school seniors are forced to deal with seperation anxiety after their plans to stage a booze-soaked party goes awry.',
  Genre: {
    Name: 'Comedy',
    Description: 'Movies intended to elicit laughter.'
  },
  Director: {
    Name: 'Greg Mottola',
    Bio: 'Greg Mottola ids an american director.',
    Birth: '1966',
    Death: 'No'
  },
  ImagePath: 'superbad.png',
  Featured: true
},
{
  _id: ("648b5b0f8d925836d83d5c24"),
  Title: 'Shawshank Redemption',
  Description: 'One man wrongly convicted of murder, and his path to escaping prison.',
  Genre: {
    Name: 'Drama/crime',
    Description: 'Crime films, in the broadest sense, are films inspired by an analogous to the crime fiction literary genre.'
  },
  Director: {
    Name: 'Frank Darabont',
    Bio: 'Frank Darabont is an american director.',
    Birth: '1959',
    Death: 'No'
  },
  ImagePath: 'Shawshank.png',
  Featured: true
},
{
  _id: ("648b5cfd8d925836d83d5c25"),
  Title: 'Good Will Hunting',
  Description: 'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-colon) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Gus Van Sant',
    Bio: 'Gus is an american director.',
    Birth: '1952',
    Death: 'No'
  },
  ImagePath: 'GWH.png',
  Featured: true
},
{
  _id: ("648b6591c193c47998e76981"),
  Title: 'The Avengers',
  Description: 'Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
  Genre: {
    Name: 'Action',
    Description: 'Action fiction is a literary genre that focuses on stories that involve high-stakes, high-energy, and fast-paced events.'
  },
  Director: {
    Name: 'Joss Whedon',
    Bio: 'Joss Whedon is am american director.',
    Birth: '1964',
    Death: 'No'
  },
  ImagePath: 'Avengers.png',
  Featured: true
},
{
  _id: ("648b66b2c193c47998e76982"),
  Title: 'Deadpool',
  Description: 'A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.',
  Genre: {
    Name: 'Action/Comedy',
    Description: 'Action fiction is a literary genre that focuses on stories that involve high-stakes, high-energy, and fast-paced events.'
  },
  Director: {
    Name: 'Tim Miller',
    Bio: 'Tim Miller is an american director.',
    Birth: '1964',
    Death: 'No'
  },
  ImagePath: 'Deadpool',
  Featured: true
},
{
  _id: ("648b6800c193c47998e76983"),
  Title: 'Top Gun',
  Description: 'As students at the United States Navys elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.',
  Genre: {
    Name: 'Action',
    Description: 'Action fiction is a literary genre that focuses on stories that involve high-stakes, high-energy, and fast-paced events.'
  },
  Director: {
    Name: 'Tony Scott',
    Bio: 'Tony Scott was an american dorector.',
    Birth: '1944'
  },
  ImagePath: 'TG.png',
  Featured: true
},
{
  _id: ("648b691ac193c47998e76984"),
  Title: 'Dumb & Dumber',
  Description: 'After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.',
  Genre: {
    Name: 'Comedy',
    Description: 'Movies intended to elicit laughter.'
  },
  Director: {
    Name: 'Peter Farelly',
    Bio: 'Peter is an american film director.',
    Birth: '1956',
    Death: 'No'
  },
  ImagePath: 'Dumb.png',
  Featured: true
}
];

//combining morgan with the accessLogScream to log users who visit the website.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
  flags: 'a'
});
app.use(morgan('combined', { stream: accessLogStream }));

//automatically sends all files that are requested from within the public folder.
app.use(express.static('public'));

//this setups a message once the user goes to the home page of the website.
app.get('/', (request, response) => {
  response.send('Welcome to Notflix!');
});

//returns a JSON object of all current users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//gets a JSON object of all the current movies on the server
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//searches for movies by their title and returns a  single JSON object
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//searches for movies by their genre and returns a JSON object
app.get('/movies/genres/:genreName', (req, res) => {
  Movies.find({ 'Genre.Name': req.params.genreName })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
});

//searches for movies by the directors name and returns the movies with that directors name
app.get('/movies/directors/:directorsName', (req, res) => {
  Movies.find({ 'Director.Name': req.params.directorsName })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
});

//creates a new user and adds them to the list of users.
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//allows users to save movies to their favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, //This line makes sure the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//deletes a user by username
app.delete('users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//allows users to delete movies from their favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
  Movies.findOneAndRemove({ Title: req.params.movieTitle }).then((movies) => {
    if (!movies) {
      res.status(400).send(req.params.movieTitle + 'was not found');
    } else {
      res.status(200).send(req.params.movieTitle + ' was deleted');
    }
  });
});

// app.delete('/users/:id/:movieTitle', (request, response) => {
//   const movieTitle = movies.find((movie) => {
//     return movie.title === request.params.movieTitle;
//   });

//   let user = users.find((user) => {
//     return user.id === request.params.id;
//   });

//   if (!movieTitle) response.status(404).send('This movie does not exist');
//   const index = user.savedMovies.indexOf(movieTitle);
//   user.savedMovies.splice(index, 1);
//   response.send('This movie has been removed from your favorites');
// });

//updates a account holders username
app.put('users/:Username', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Usermame: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updateUser);
      }
    }
  );
});

//this is a error code to dectect erros in the code above.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//if everything functions correctly this message is logged from port 8080 thats listening.
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});