'use strict';

const morgan = require('morgan');

const express = require('express')

const nodemon = require('nodemon')

const { top50 }  = require('./data/top50');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.get('/top50', function (req,res){
    res.render('pages/top50',{
        title: 'Top 50 Songs Streamed On Spotify',
        top50: top50,
    });
})

app.get('/top50/popular-artist', function(req,res){
    let artistCount = {}

    top50.forEach((song) =>{
        if(artistCount[song.artist] === undefined){
            artistCount[song.artist] = 1;
        }else{
            artistCount[song.artist] += 1;
        }
    })
    let artistArray = Object.keys(artistCount)

    let sortedArtistArray = artistArray.sort((artistA, artistB)=>{
        let countA = artistCount[artistA]
        let countB = artistCount[artistB]
        if(countA < countB){
            return 1
        }else{
            return -1
        }
    })
    console.log(sortedArtistArray)

    let mostPopularArtist = sortedArtistArray[0]

    let onlyPopularArtist = top50.filter((item) =>{
        if(item.artist === mostPopularArtist){
            return item
        }
    })

    res.render('pages/top50', {
        title:'Most Popular Artist',
        top50: onlyPopularArtist,
    })
})

app.get('/top50/song/:num', (req,res) =>{
    let songRank = req.params.num - 1
    if(songRank >= 0 && songRank <= 49){
        res.render('pages/song-page', {
            selectedSong: top50[songRank],
            title: 'Song # '+ (songRank + 1)
        })
    }else{
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }
})

// endpoints here

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
