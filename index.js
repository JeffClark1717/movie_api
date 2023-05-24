const express = require("express");
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

let topMovies = [
    {
      title: 'Step Brothers',
      year: '2008',
      year: 2008,
      genre: 'Comedy',
    },
    {
      title: 'Anchorman',
      year: '2004',
      year: 2004,
      genre: 'Comedy',
    },
    {
      title: 'Superbad',
      year: '2007',
      year: 2007,
      genre: 'Comedy/Teen',
    },
    {
      title: 'Shawshank Redemption',
      year: '1994',
      year: 1994,
      genre: 'Drama.Crime',
    },
    {
      title: 'Good Will Hunting',
      year: '1997',
      year: 1997,
      genre: 'Drama/Romance',
    },
    {
      title: "The Avengers",
      year: '2012',
      year: 2012,
      genre: 'Action/Sci-fi',
    },
    {
      title: 'Deadpool',
      year: '2016',
      year: 2016,
      genre: 'Action/Comedy',
    },
    {
      title: 'Top Gun',
      year: '1986',
      year: 1986,
      genre: 'Action',
    },
    {
      title: 'Dumb and Dumber',
      year: '1994',
      year: 1994,
      genre: 'Comedy',
    },
    {
      title: 'Ace Ventura Pet Detective',
      year: '1994',
      year: 1994,
      genre: 'Comedy',
    },
  ];

  app.get('/movies', (req, res) => {
    response.json(topMovies);
  });
  
  app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
  });

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});