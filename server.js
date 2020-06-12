"use strict";

const morgan = require("morgan");
const express = require("express");

const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", (req, res) => {
  res.render("pages/top50", { top50 });
});

app.get("/top50/popular-artist", (req, res) => {
  // artist count
  let artistCount = [];

  //Go over songs to get all the artists
  top50.forEach((song) => {
    artistCount.push(song.artist);
  });

  //Go over the artists & count them up
  let popularArtist = [];
  artistCount.forEach(function (artist) {
    //Check if this exists yet
    if (typeof popularArtist[artist] === "undefined") {
      //initialize with 1
      popularArtist[artist] = 1;
    } else {
      //Exists already increment by 1
      popularArtist[artist] += 1;
    }
  });

  //Get the highest artist
  let artistName;
  let mostPopularArtist = { highestCount: 0, artistName: "" };

  for (artistName in popularArtist) {
    artistCount = popularArtist[artistName];

    //artist more popular than the one we had
    if (artistCount > mostPopularArtist.highestCount) {
      //Replace with this new artist
      mostPopularArtist.highestCount = artistCount;
      mostPopularArtist.artistName = artistName;
    }
  }

  //Get the songs of the highest artist
  let mostPopularSongs = [];
  top50.forEach((song) => {
    //Match songs that match our most popular artist
    if (song.artist == mostPopularArtist.artistName) {
      mostPopularSongs.push(song);
    }
  });

  //Send songs of most popular artist
  res.render("partials/popular-artist", { mostPopularSongs: mostPopularSongs });
});

// 1.6 - have each song have its own page
app.get("/top50/song/:rank", (req, res) => {
  const rank = req.params.rank - 1;
  if (top50[rank]) {
    res.render("pages/songPage", {
      title: `Song #${top50[rank].rank}`,
      song: top50[rank],
    });
  } else {
    // 1.7 handle 404 errors
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

// BOOK ASSIGNMENT
const { books } = require("./data/books");

//book endpoint
app.get("/books", (req, res) => {
  res.render("pages/books", {
    title: "Check Out These Books!",
    books: books,
  });
});

// get book by id

//handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
