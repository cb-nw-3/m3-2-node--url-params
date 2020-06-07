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

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
