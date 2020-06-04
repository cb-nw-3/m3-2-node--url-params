"use strict";

const findTopArtist = (arr) => {
  let obj = {};
  let topArtistSongs = [];

  arr.forEach((song) => {
    obj[song.artist] = 0;
  });

  arr.forEach((song) => {
    obj[song.artist] = obj[song.artist] + 1;
  });

  let artistsArr = Object.keys(obj);

  artistsArr.sort((a, b) => {
    a = obj[a];
    b = obj[b];

    if (a > b) {
      return -1;
    } else {
      return 1;
    }
  });

  arr.forEach((song) => {
    if (song.artist === artistsArr[0]) {
      topArtistSongs.push(song);
    }
  });
  return topArtistSongs;
};

const express = require("express");

const morgan = require("morgan");

const { top50 } = require("./data/top50");

const topArtist = findTopArtist(top50);

const PORT = process.env.PORT || 8000;

const app = express();

const title = "Top 50 Songs Streamed on Spotify";

const mostPopularArtistTitle = "Most Popular Artist";

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", (req, res) => {
  res.render("pages/top50.ejs", { title: title, top50: top50 });
});

app.get("/top50/popular-artist", (req, res) => {
  res.render("pages/top50.ejs", {
    title: mostPopularArtistTitle,
    top50: topArtist,
  });
});

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
