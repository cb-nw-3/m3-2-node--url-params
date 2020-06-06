'use strict';

const morgan = require('morgan');

//##1.2 requiring the 'top50' file
const { top50 } = require('./data/top50');
//#2.1
const { books } = require('./data/books');



const PORT = process.env.PORT || 8000;

const express = require('express')
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', (req, res) => {
    res.render('pages/top50', {
        title: 'Top 50 Songs Streamed on Spotify',
        top50: top50
    });
})

//#1.5
app.get("/top50/popular-artist", (req, res) => {
    let artistsCount = {};
    top50.forEach((song) => {
      if (song.artist in artistsCount) {
        artistsCount[song.artist]++;
      } else {
        artistsCount[song.artist] = 1;
      }
    });
  
    let mostPopularArtist = "";
    let artistAppearances = 0;
  
    Object.keys(artistsCount).forEach((artist) => {
      if (artistsCount[artist] > artistAppearances) {
        artistAppearances = artistsCount[artist];
        mostPopularArtist = artist;
      }
    });

    let popular = top50.filter((song) => song.artist === mostPopularArtist);
    res.render("pages/top50", {
      title: "Most Popular Artist",
      top50: popular,
    });
  });

//#1.6
app.get('/top50/song/:rank', (req, res) => {
    const rank = req.params.rank - 1;
    if (top50[rank]) {    
        res.render('pages/songPage', {
            title: `Song #${top50[rank].rank}`,
            song: top50[rank]
        });
    } else {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }
});

//#2.1 all books endpoint
app.get('/books', (req, res) => {
    res.render('pages/books', {
        title: "Books Recommended by Jenny",
        books: books
    });
});

//#2.1 books by id endpoint
app.get("/books/:id", (req, res) => {
    const id = req.params.id - 1;
    
    if (books[id]) {
      res.render("pages/booksPage", {
        title: `Book ID#${books[id].id}`,
        books: books[id],
      });
    } else {
      res.status(404);
      res.render("pages/fourOhFour", {
        title: "I got nothing",
        path: req.originalUrl,
      });
    }
  });


// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
