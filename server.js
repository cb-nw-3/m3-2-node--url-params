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

const findSong = (arr, rank) => {
  let currentSong = [];

  arr.forEach((song) => {
    if (song.rank === parseInt(rank)) {
      currentSong.push(song);
    }
  });
  return currentSong;
};

const findBook = (arr, id) => {
  let currentBook = [];

  arr.forEach((book) => {
    if (book.id === parseInt(id)) {
      currentBook.push(book);
    }
  });
  return currentBook;
};

const express = require("express");

const morgan = require("morgan");

const { top50 } = require("./data/top50");

const topArtist = findTopArtist(top50);

const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;

const app = express();

const title = "Top 50 Songs Streamed on Spotify";

const mostPopularArtistTitle = "Most Popular Artist";

const songTitle = `Song #`;

const bookListTitle = "Books";

const bookTitle = "Books #";

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here

// SONGS endpoints

app.get("/top50", (req, res) => {
  res.render("pages/top50.ejs", { title: title, top50: top50 });
});

app.get("/top50/popular-artist", (req, res) => {
  res.render("pages/top50.ejs", {
    title: mostPopularArtistTitle,
    top50: topArtist,
  });
});

app.get("/top50/song/:rank", (req, res) => {
  if (req.params.rank < 51 && req.params.rank > 0) {
    res.render("pages/songPage.ejs", {
      title: songTitle + req.params.rank,
      top50: findSong(top50, req.params.rank),
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

// BOOKS endpoints

app.get("/books", (req, res) => {
  res.render("pages/bookList.ejs", { title: bookListTitle, books: books });
});

app.get("/books/:id", (req, res) => {
  if (req.params.id > 100 && req.params.id < 126) {
    res.render("pages/bookPage.ejs", {
      title: bookTitle + req.params.id,
      books: findBook(books, req.params.id),
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
