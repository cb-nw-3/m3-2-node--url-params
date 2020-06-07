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
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50: top50,
  });
});

app.get("/popular-artist", (req, res) => {
  res.render("pages/mostpopular", {
    title: "Most  Popular Artist",
    top50: top50,
  });
});
app.get("/top50/song/:id", (req, res) => {
  let songNumber = req.params.id;

  if (top50[songNumber]) {
    let title = top50[songNumber - 1].title;
    let artist = top50[songNumber - 1].artist;
    let streams = top50[songNumber - 1].streams;

    res.render("pages/song", {
      songNumber: songNumber,
      top50: top50,
      title: title,
      artist: artist,
      streams: streams,
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
