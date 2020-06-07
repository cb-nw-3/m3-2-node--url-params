"use strict";

const express = require("express");
const morgan = require("morgan");
const { top50 } = require("./data/top50");
const PORT = process.env.PORT || 8000;

const q1 = (req, res) => {
  const title = "Top 50 Songs Streamed on Spotify";
  res.render("./pages/top50", { title, top50 });
};

const q2 = (req, res) => {
  const title = "Top 50 Songs Streamed on Spotify";
  let artistMentioned = [];
  let artistPopularity = [];
  top50.forEach((musician) => {
    if (!artistMentioned.includes(musician.artist)) {
      artistMentioned.push(musician.artist);
      musician.points = 0;
      artistPopularity.push(musician);
    } else {
      artistPopularity.forEach((popular) => {
        if (popular.artist === musician.artist) {
          popular.points += musician.streams;
        }
      });
    }
  });
  artistPopularity.sort(function (a, b) {
    return b.points - a.points;
  });
  let finalPopList = top50.filter(function (item) {
    return item.artist === artistPopularity[0].artist;
  });
  res.render("./pages/popular-artist", { title, finalPopList });
};

const q3 = (req, res) => {
  const songID = req.params.songID;
  let songSelected = {};
  top50.forEach(function (song) {
    if (song.rank == songID) {
      songSelected = song;
    }
  });
  let title = "Song #" + songID;
  console.log("songSelected: ", songSelected);
  res.render("./pages/songPage", { title, songSelected });
};

const app = express();

// app.get("/", function (req, res) {
//   res.send("You are at the Home Page!!!");
// });

app.get("/top50", q1);
app.get("/top50/popular-artist", q2);
app.get("/top50/:songID", q3);
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
