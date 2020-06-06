"use strict";

const express = require("express");
const morgan = require("morgan");

const { top50 } = require("./data/top50");
const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here (For Exercise 1)
app.get("/top50", (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50: top50,
  });
});
app.get("/top50/popular-artist", (req, res) => {
  const artists = [];
  const artistCount = {};

  top50.forEach((song) => {
    if (!artists.includes(song.artist)) {
      artists.push(song.artist);
    }
  });

  artists.forEach((artist) => {
    let count = 0;
    top50.forEach((song) => {
      if (song.artist === artist) count += 1;
    });
    artistCount[artist] = count;
  });

  const rankedArtists = [];
  Object.values(artistCount).forEach((count, id) => {
    const artist = Object.keys(artistCount)[id];
    rankedArtists.push({
      artist: artist,
      count: count,
    });
  });

  const mostPopularArtist = rankedArtists.sort((a, b) =>
    a.count < b.count ? 1 : -1
  )[0].artist;

  res.render("pages/popularArtist", {
    title: "Most Popular Artist",
    songs: top50.filter((song) => song.artist === mostPopularArtist),
  });
});

app.get("/top50/song/:rank", (req, res) => {
  const rank = req.params.rank - 1;
  if (top50[rank]) {
    res.render("pages/songPage", {
      title: `Song #${top50[rank].rank}`,
      song: top50[rank],
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

// endpoints here (For Exercise 2)
app.get("/allbooks", (req, res) => {
  res.render("pages/allbooks", {
    title: "My Favorite 25 Books of all Time",
    books: books,
  });
});

app.get("/allbooks/book/:id", (req, res) => {
  const id = req.params.id - 1;
  if (books[id]) {
    res.render("pages/bookPage", {
      title: `Book ID#${books[id].id}`,
      books: books[id],
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

app.get("/booktype/:type", (req, res) => {
  res.render("pages/booktype", {
    title: `Type: ${req.params.type}`,
    books: books.filter((book) => book.type === req.params.type),
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
