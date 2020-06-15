'use strict';

const express = require('express');
const morgan = require('morgan');

const { top50 } = require('./data/top50');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', (req, res) => {
    res.render('pages/top50.ejs' , {title: 'Top 50 Songs Streamed on Spotify', top50: top50});
})

app.get('/song/:rank', (req, res) => {
    const rank = req.params.rank;
    res.render('pages/song-page.ejs', {
        title: `Song #${top50[rank - 1].rank}`,
        song: top50[rank - 1]
    });
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
