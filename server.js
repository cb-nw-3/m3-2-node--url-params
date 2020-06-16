'use strict';

const express = require('express');
const morgan = require('morgan');

const { books } = require('./data/books');
const { top50 } = require('./data/top50');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/books', (req, res) => {
    res.render('pages/books.ejs' , {
        title: 'Books',
        books: books
    });
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    res.render('pages/book-page.ejs', {
        title: `${books[id - 101].title} by ${books[id - 101].author} (${id}) ${books[id - 101].type}`,
        book: books[id - 101]
    })
})

app.get('/books/type/:type', (req, res) => {
    const type = req.params.type;
    if(type !== 'fiction' && type !== 'non-fiction' && type !== 'drama'){
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    } else {
        let typeArr = [];
        books.forEach(book => {
            if(type === book.type){
                typeArr.push(book);
            }
        })
        res.render('pages/book-type-page.ejs', {
            title: `Here is our selection of ${type} books`,
            books: typeArr
        })
    }
})

app.get('/top50', (req, res) => {
    res.render('pages/top50.ejs' , {title: 'Top 50 Songs Streamed on Spotify', top50: top50});
})

app.get('/song/:rank', (req, res) => {
    const rank = req.params.rank;
    if (rank < 1 || rank > 50){ 
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    } else {
        res.render('pages/song-page.ejs', {
        title: `Song #${top50[rank - 1].rank}`,
        song: top50[rank - 1]
    });
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
