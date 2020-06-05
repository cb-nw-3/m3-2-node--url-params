'use strict';

const morgan = require('morgan');
const express = require('express');

const { top50 } = require('./data/top50');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', (req, res) => {
  res.render('pages/top50', {
    title: "Top 50 Songs Streamed on Spotify",
    top50: top50
  })
})
app.get('/top50/popular-artist', (req, res) => {
  res.render('pages/popularArtist', {
    title: "Most Popular Artist",
    top50: top50
  })
})
app.get('/top50/song/:songRank(\\d+)', (req, res) => {
  let songRank = req.params.songRank - 1;
  res.render('pages/songs', {
    // if (top50[songRank]) {
      title: `Song ${top50[songRank].rank}`,
      song: top50[songRank]
    // } else {
    //   console.log('clicked');
    // }
  })
})

// handle 404s
app.get('*', (req, res) => {
  res.status(404);
  res.render('pages/fourOhFour', {
    title: 'I got nothing',
    path: req.originalUrl
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
