'use strict';

const morgan = require('morgan');
const express = require('express');
const url = require('url');

const { top50 } = require('./data/top50');

const { books } = require('./data/books');

const PORT = process.env.PORT || 8000;

const app = express();



app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// endpoints here

app.get('/top50', (req, res) => res.render('pages/top50', { title: 'Top 50 Songs Streamed on Spotify', songsToList: top50 }));


let topRanked = [{
    rank: String,
    title: String,
    artist: String,
    streams: String,
    publicationDate: String
}];


let sortedByStreams = top50.sort(function (a, b) {
    if (a.streams < b.streams) {
        return 1;
    }
    if (a.streams > b.streams) {
        return -1;
    }

    return 0;
}
);

var topArtist = sortedByStreams[0].artist;
let songsByTopArtist = sortedByStreams.filter(function (element) {
    if (element.artist === topArtist) {
        return true;
    }
    else {
        return false;
    }

});


// console.log(songsByTopArtist);

app.get('/top50/popularArtist', (req, res) => res.render('pages/popular-artist', { title: 'Songs by the most popular arist', songsToList: songsByTopArtist }));

app.get('/top50/song/*', (req, res) => {
    let songNumberFromURL = req.url.split('/');
    let songNumberLast = Number(songNumberFromURL[songNumberFromURL.length - 1])

    if (songNumberLast > top50.length) {
        res.render('pages/fourOhFourNoSong', {
            title: 'Sorry, that song does not exist ',
            path: req.originalUrl
        });

    }
    else {
        let title = "Song #" + songNumberLast;
        let song = top50.find(element => element.rank === songNumberLast);

        res.render('pages/song', { title: title, song: song });

    }


});

app.get('/books', (req, res) => {
    res.render('pages/books', { title: 'Books In the library', books: books });
});

let genres = [String];
let ids = [Number];

books.forEach(
    book => {
        genres.push(book.type);
        ids.push(book.id);
    }
);


app.get('/books/:parameters', (req, res) => {

    const parameter = req.params.parameters;
    console.log(parameter);

    if (genres.includes(parameter)) {
        const genreFromURL = parameter
        console.log(genreFromURL)
        let booksToPass = books.filter(element =>
            element.type == genreFromURL);

        let title = genreFromURL + " books in library"
        if (booksToPass.length > 0) {
            res.render('pages/genres', { title: title, books: booksToPass });

        }
    }
    let idFromParameter = Number(parameter)
    if (ids.includes(idFromParameter)) {
        let booksToPass = books.filter(element =>
            element.id == idFromParameter);
        console.log(booksToPass);
        let title = " Book by ID:" + parameter
        if (booksToPass.length > 0) {
            res.render('pages/books', { title: title, books: booksToPass });

        }
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




