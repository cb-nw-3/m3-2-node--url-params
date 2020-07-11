'use strict';

const express = require('express');

const morgan = require('morgan');

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
        title: 'Top 50 Songs Streamed on Spotify', top50: top50
    });
});

app.get('/top50/popular-artist', (req, res) => {
    const artists = [];
    const artistCount = {};
    
    top50.forEach(item => {
        if (!artists.includes(item.artist)) {
            artists.push(item.artist);
        };
    });

    artists.forEach(artist => {
        let count = 0;
        top50.forEach(item => {
            if (item.artist === artist) count += 1;
        });
        artistCount[artist] = count;
    });

    const rankedArtists = [];

    Object.values(artistCount).forEach((count, id) => {
        const artist = Object.keys(artistCount)[id];
        rankedArtists.push({
            artist: artist,
            count: count
        });
    });

    const mostPopularArtist = rankedArtists.sort((a, b) => a.count < b.count ? 1 : -1)[0].artist;    

    res.render('pages/popularArtist', {
        title: 'Most Popular Artist',
        songs: top50.filter(item => item.artist === mostPopularArtist)
    });
});

app.get('/top50/song/:rank', (req, res) => {
    const rank = req.params.rank - 1;
    // console.log(rank);
    if (top50[rank]) { 
        // console.log(top50[rank]);   
        res.render('pages/songPage', {
            title: `Song #${top50[rank].rank}`,
            song: top50[rank]
        });
    } else {
        // console.log(top50[rank]); 
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    };
});

app.get('/books', (req, res) => {
    res.render('pages/books', {
        title: 'View all books', books: books
    });
});

app.get('/books/book/:id', (req, res) => {
    const id = req.params.id;
    
    if (id < 101 || id > 125) {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    } else {
        let book = books.find(book => {
            return book.id === Number(id);
        });
        res.render('pages/bookPage', {
            title: 'Book Page',
            bookTitle: book.title,
            bookAuthor: `Author: ${book.author}`,
            bookType: book.type,
            bookId: book.id,
            bookImage: book.imgUrl      
        });
    };
});

// Implement filter by book type
app.get('/books/type/:type', (req, res) =>{
    const type = req.params.type

    let bookType = books.filter((book) =>{
        if (book.type === type){
            return book
        };
    });
    // TODO: Implement 404 redirect for wrong param added
    res.render('pages/books', {
        title: `View books by type: ${type}`, books: bookType
    });
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
