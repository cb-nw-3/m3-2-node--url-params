'use strict';

const express = require('express');
const morgan = require('morgan');

const { top50 } = require('./data/top50');
const { popularArtist } = require('./data/popularArtist');

const PORT = process.env.PORT || 8000;
const home = (req, res) => res.render('pages/home');
const top50page = (req, res) => res.render('pages/top50', { top50 });
const songPage = (req, res) => {
  const path = req.params[0].split('/');
  // console.log(path[0]);
  // console.log(path[1]);

  if (
    path[0] === 'song' &&
    path.length === 2 &&
    parseInt(path[1]) > 1 &&
    parseInt(path[1]) < 50 &&
    path[1].length === 2
  ) {
    const song = top50.find((element) => element.rank === parseInt(path[1]));
    res.render('pages/song', { song });
  } else {
    res.render('pages/fourOhFour', {
      title: 'I got nothing',
      path: req.originalUrl,
    });
  }
};

const songsOfMostPopular = (req, res) =>
  res.render('pages/popular', { popularArtist });

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints here

app.get('/', home);
app.get('/top50', top50page);
app.get('/top50/*', songPage);
app.get('/top50/popular-artist', songsOfMostPopular);

// handle 404s
app.get('*', (req, res) => {
  res.status(404);
  res.render('pages/fourOhFour', {
    title: 'I got nothing',
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
