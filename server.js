'use strict';

const morgan = require('morgan');

const express = require('express');

const { top50 } = require('./data/top50');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', (req,res) => {
  const title = "Top 50 Songs Streamted on Spotify"
  res.render('pages/top50', {title: title, rank: top50});
})

// app.get('/top50/popular-artist', (req,res) => {
//   const title = "Most Popular Artist"
//   res.render('pages/top50', {title: title, rank: top50.sort((songA,songB) => {
//     if(songA.streams < songB.streams) {
//       return 1;
//     }
//     if(songA.streams > songB.streams) {
//       return -1;
//     }
//     return 0;
//   })});
// })

app.get('/top50/popular-artist', (req,res) => {
  const title = "Most Popular Artist"

  // this sorts out the artists by occurences
let count = {};
top50.forEach(song => {
  count[song.artist] = (count[song.artist] || 0) + 1;
})

// console.log(count);

//this creates a sorted array from the most popular artist to least
//based on the above occurences of their hits on the top50 data
let final = Object.keys(count).sort((a,b) => {
  let countA = count[a];
  let countB = count[b];
  // (countA < countB) ? 1 : -1;
  if(countA < countB) {
    return 1;
  } else {
    return -1;
  }
})

//choose to most popular artist
let topArtist = final.slice(0,1);
//console.log(topArtist);

let obj = [];
// let result = top50.filter(song => {
//   for(let i = 0; i< topArtist.length; i++) {
//     if(song.artist == topArtist[i]) {
//       obj.push(song);
//     };
//   }
// })

//return a new array of objects that only have songs from the top artist
let result = top50.filter(song => {
    if(song.artist == topArtist) {
      obj.push(song);
    };
})


  res.render('pages/top50', {title: title, rank: obj});
  
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
