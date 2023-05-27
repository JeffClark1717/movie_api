const express = require("express");
const morgan = require('morgan');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

let topMovies = [
    {
      title: 'Step Brothers',
      year: '2008',
      genre: 'Comedy',
    },
    {
      title: 'Anchorman',
      year: '2004',
      genre: 'Comedy',
    },
    {
      title: 'Superbad',
      year: '2007',
      genre: 'Comedy/Teen',
    },
    {
      title: 'Shawshank Redemption',
      year: '1994',
      genre: 'Drama/Crime',
    },
    {
      title: 'Good Will Hunting',
      year: '1997',
      genre: 'Drama/Romance',
    },
    {
      title: "The Avengers",
      year: '2012',
      genre: 'Action/Sci-fi',
    },
    {
      title: 'Deadpool',
      year: '2016',
      genre: 'Action/Comedy',
    },
    {
      title: 'Top Gun',
      year: '1986',
      genre: 'Action',
    },
    {
      title: 'Dumb and Dumber',
      year: '1994',
      genre: 'Comedy',
    },
    {
      title: 'Ace Ventura Pet Detective',
      year: '1994',
      genre: 'Comedy',
    },
  ];

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
  response.send('Default Textual Response');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});