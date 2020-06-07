"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50: top50,
  });
});

// revoir avec guillaume
app.get("/top50/popular-artists", (req, res) => {
  const isThisAJustinBieberSong = (song) => song.artist === "Justin Bieber";
  const songs = top50.filter(isThisAJustinBieberSong);
  res.render("pages/popularArtists", {
    title: "Popular Artists",
    songs: songs,
  });
});

app.get("/song/:song", (req, res) => {
  const isTheSongFromParams = (song) => song.rank === Number(req.params.song);
  const song = top50.find(isTheSongFromParams);
  if (song) {
    res.render("pages/songPage", {
      title: "Song details",
      song: song,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
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
