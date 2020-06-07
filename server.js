'use strict';
const express = require('express');
const morgan = require('morgan');

const { top50 } = require('./data/top50');
const { books } = require('./data/books');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints here

app.get('/top50', (req, res) => {
    res.render('pages/top50', { data: top50 });
})

app.get('/top50/popular-artist', (req, res) => {

    // go through top50 data
    // add all popular artists to an array
    let allArtists = [];

    top50.forEach(song => {
        if (!allArtists.includes(song.artist)) {
            allArtists.push(song.artist);
        }
    })

    // go through the whole data, count the number of times the artist appears
    // if it's higher than the current winner, replace the current winner

    let winnerArtist = ['', 0];

    for (let i = 0; i < allArtists.length; i++) {
        let winNum = 0;
        top50.forEach(song => {
            if (song.artist === allArtists[i]) {
                winNum++;
            }
        })

        if (winNum > winnerArtist[1]) {
            winnerArtist = [allArtists[i], winNum];
        }

    };

    // ok. Now we have a winner artist. Let's grab the data relating to this artist.

    let popularArtistSongs = [];

    top50.forEach(song => {
        if (song.artist === winnerArtist[0]) {
            popularArtistSongs.push(song);
        }
    })

    res.render("pages/popular-artist", { data: popularArtistSongs })
})

app.get('/top50/song/:songNum', (req, res) => {

    if (top50[req.params.songNum - 1] === undefined) {
        console.log("what");
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    } else {
        res.render("pages/song", { data: top50[req.params.songNum - 1] });
    }

});

// ========================= BOOK ROUTES HERE ============================

// all books view

app.get('/books', (req, res) => {

    let typeArr = [];

    books.forEach(book => {
        if (!typeArr.includes(book.type)) {
            typeArr.push(book.type)
        }
    })

    res.render('pages/books', { data: books, typelist: typeArr });
})

// individual book view

// ah hell. this is gonna get complicated to pull the specific book.
// basically, we need to pull the object values for the key 'id'
// this should return an array that matches the order of the books
// we find the indexOf the desired item in the array
// then we return that number and pull the actual data that we want.

// that was not nearly as complicated as I thought it was going to be.
// what can that possibly mean.

app.get('/books/id/:bookId', (req, res) => {

    // let's assume that there would normally be data validation here.

    let bookId = Number(req.params.bookId);

    let bookIdArr = [];

    books.forEach(book => {
        bookIdArr.push(book.id);
    })

    if (books[bookIdArr.indexOf(bookId)] === undefined) {
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    } else {
        res.render("pages/singlebook", { data: books[bookIdArr.indexOf(bookId)] });
    }
})

// book type view

app.get('/books/type/:type', (req, res) => {

    let bookArr = [];

    books.forEach(book => {
        if (book.type === req.params.type) {
            bookArr.push(book);
        }
    })

    res.render("pages/typelist", { data: bookArr });
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
