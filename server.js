"use strict";

const morgan = require("morgan");

const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const express = require("express");
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

app.get("/top50/popular-artist", (req, res) => {
  let allArtistsObj = {};

  // Create an object which contains each artist and count the number of times they appear
  top50.forEach((song) => {
    if (allArtistsObj[song.artist] === undefined) {
      allArtistsObj[song.artist] = 1;
    } else {
      allArtistsObj[song.artist] += 1;
    }
  });

  // Create an array containing the names of the array
  let keysArray = Object.keys(allArtistsObj);

  // Create an array that is sorted based by the artist with the highest count
  let sortedArray = keysArray.sort((artistA, artistB) => {
    let numOfA = allArtistsObj[artistA];
    let numOfB = allArtistsObj[artistB];

    if (numOfA > numOfB) {
      return -1;
    } else {
      return 1;
    }
  });

  // Find the artist with the highest count
  let mostPopularArtist = sortedArray[0];

  res.render("pages/popular-artist", {
    title: "Most Popular Artist",

    // Display page with filtering the songs of the artist with the highest count
    top50: top50.filter((song) => {
      if (song.artist === mostPopularArtist) {
        return song;
      }
    }),
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
