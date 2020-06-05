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

// endpoints here
app.get("/top50", (req, res) => {
  res.render("pages/top50.ejs", {
    title: "Top 50 Songs Streamed on Spotify",
    top50: top50,
  });
});

app.get("/top50/popular-artist", (req, res) => {
  let artistsCount = {};
  top50.forEach((song) => {
    if (song.artist in artistsCount) {
      artistsCount[song.artist]++;
    } else {
      artistsCount[song.artist] = 1;
    }
  });

  let mostPopurArtist = "";
  let artistAppearances = 0;

  Object.keys(artistsCount).forEach((artist) => {
    if (artistsCount[artist] > artistAppearances) {
      artistAppearances = artistsCount[artist];
      mostPopurArtist = artist;
    }
  });
  // Will ignore "featuring" other artists
  // Expecting Justin Bieber anyway
  let popular = top50.filter((song) => song.artist === mostPopurArtist);
  res.render("pages/top50.ejs", {
    title: "Most Popular Artist",
    top50: popular,
  });
});

app.get("/top50/song/:number", (req, res) => {
  let rank = parseInt(req.params.number);

  if (rank < 1 || rank > 50) {
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }

  let song = top50.find((x) => x.rank === rank);
  res.render("pages/selected.ejs", {
    title: "Song #" + rank,
    song: song,
  });
});

// BOOKS
app.get("/books", (req, res) => {
  let types = [];
  books.forEach((book) => {
    if (!types.includes(book.type)) {
      types.push(book.type);
    }
  });

  let filteredBooks = books;
  if (req.query.type && req.query.type !== "all") {
    filteredBooks = filteredBooks.filter(
      (book) => book.type.toLowerCase() === req.query.type.toLowerCase()
    );
  }

  res.render("pages/books.ejs", {
    title: "Library",
    books: filteredBooks,
    types: types,
    defaultType: req.query.type,
  });
});

app.get("/book/:number", (req, res) => {
  let bookNum = parseInt(req.params.number);

  let book = books.find((book) => book.id === bookNum);

  if (!book) {
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }

  res.render("pages/book.ejs", {
    title: book.title,
    book: book,
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
