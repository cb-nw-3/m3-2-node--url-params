'use strict';

const morgan = require('morgan');

const express = require('express');

const { top50 } = require('./data/top50');

const { books } = require('./data/books');

const PORT = process.env.PORT || 8000;

const app = express();

const song22 = top50[21];

// For exercice 1-5
let count = {};
let newArr = top50.forEach((song) => {
  count[song.artist] = (count[song.artist] || 0) + 1;
  /* the LHS is the key of the newly created object  
  while the RHS, if the value did not exist, it will set the value to 0 and then add 1, if it already existed it will add 1 to it.
*/
});

let sortable = [];
for (let artist in count) {
  sortable.push([artist, count[artist]]);
}
sortable.sort(function (a, b) {
  return b[1] - a[1];
});

console.log(sortable[0]);

const topArtist = top50.filter((name) => name.artist === 'Justin Bieber');

// End exercice 5

// Exercice 2-3 - Object filter

let countB = {};
const newArrB = books.forEach((book) => {
  countB[book.type] = (countB[book.type] || 0) + 1;
});

console.table(countB);

const sortableB = [];
for (let book in countB) {
  sortableB.push([book, countB[book]]);
}

const typeFiction = books.filter((name) => name.type === 'fiction');
const typeNonFiction = books.filter((name) => name.type === 'non-fiction');
const typeDrama = books.filter((name) => name.type === 'drama');
const typeGraphicNovel = books.filter((name) => name.type === 'graphic-novel');

// End Exercice 2-3

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints here

app.get('/top50', (req, res) => {
  const a = 'Top 50 Songs Streamed on Spotify';
  const b = 'hello';
  res.render('pages/top50', {
    // 1st argument is EJS file to render,
    title: a,
    top50: top50,
    /* 2nd argument is an object with the key=title, same as the "key" in the aligator tag in "header.ejs"
       the "value" that we want to render.
    */
  });
});

// Exercice 1-5

app.get('/top50/popular-artist', (req, res) => {
  const c = 'Most Popular Artist';
  res.render('pages/popular-artist', {
    title: c,
    popularArtist: topArtist,
  });
});

// End Exercice 1-5

// Exercice 1-6

app.get('/top50/song/22', (req, res) => {
  const d = 'Song #22';
  res.render('pages/song-22', {
    title: d,
    song22: song22,
  });
});
// End 1-6

// Exercice 2-1/1

app.get('/', (req, res) => {
  const d = 'Booklist';
  res.render('pages/homepage', {
    title: d,
    books: books,
    sortableB: sortableB,
  });
});

// End Exercice 2-1-1

// Exercice 2-1/2

app.get('/101', (req, res) => {
  const e = books[0].title;
  res.render('pages/book101', {
    title: e,
    books: books,
  });
});

// End Exercice 2-1/2

// Exercice 2-3 - Endpoint creation - Needs to create an EJS file for each type

app.get('/fiction', (req, res) => {
  const e = 'Fiction';
  res.render('pages/fiction', {
    title: e,
    popularArtist: topArtist,
    typeFiction: typeFiction,
  });
});

app.get('/nonfiction', (req, res) => {
  const e = 'Non-Fiction';
  res.render('pages/nonfiction', {
    title: e,
    typeNonFiction: typeNonFiction,
  });
});

app.get('/drama', (req, res) => {
  const e = 'Drama';
  res.render('pages/drama', {
    title: e,
    typeDrama: typeDrama,
  });
});

app.get('/graphicnovel', (req, res) => {
  const e = 'Graphic Novel';
  res.render('pages/graphicnovel', {
    title: e,
    typeGraphicNovel: typeGraphicNovel,
  });
});

// End Exercice 2-3

// handle 404s
app.get('*', (req, res) => {
  res.status(404);
  res.render('pages/fourOhFour', {
    title: 'I got nothing',
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

/*
- add express module in express
	"yarn add express"
- add const express in "server.js" 
- "get" instead of "git" on line 23 in server.js 
- "app" instead of "get" on lune 31 in server.js
*/
