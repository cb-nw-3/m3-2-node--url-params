'use strict';

const morgan = require('morgan');
const express = require('express');

const { top50 } = require('./data/top50');
const { books } = require('./data/books');

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
  if (top50[songRank]) {
    res.render('pages/songs', {
      title: `Song ${top50[songRank].rank}`,
      song: top50[songRank]
    })
  } else {
    res.status(404);
    res.render('pages/fourOhFour', {
      title: 'Why are you looking for trouble...',
      path: req.originalUrl
    })
  }
})

app.get('/books', (req, res) => {
  res.render('pages/books', {
    title: "25 Must Read Books",
    books: books
  })
})
app.get('/books/:id', (req, res) => {
  let bookID = req.params.id -1;
  if (books[bookID]) {
    res.render('pages/book', {
      title: `${books[bookID].title} - ${books[bookID].type}`,
      book: books[bookID]
    })
  } else {
    res.status(404);
    res.render('pages/fourOhFour', {
      title: 'Why are you looking for trouble...',
      path: req.originalUrl
    })
  }
})
app.get('/books/type/:type', (req, res) => {
  let checker = false;
  books.forEach(item => {
    if (item.type === req.params.type) {
      checker = true;
    }
  })
  if (checker) {
    res.render('pages/bookType', {
      title: `${req.params.type}`,
      books: books
    })
  } else {
    res.status(404);
    res.render('pages/fourOhFour', {
      title: 'Why are you looking for trouble...',
      path: req.originalUrl
    })
  }
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
