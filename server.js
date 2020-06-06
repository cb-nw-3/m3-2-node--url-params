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
  res.render("./pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50: top50,
  });
});

//most popular artist by total streams
app.get("/top50/popular-artist", (req, res) => {
  let totalStreams = {};

  top50.forEach((song) => {
    if (totalStreams[song.artist]) {
      totalStreams[song.artist] += song.streams;
      //console.log("totalStreams: ", totalStreams[song.artist], song.artist);
    } else {
      totalStreams[song.artist] = song.streams;
      //console.log("totalStreams: ", totalStreams[song.artist], song.artist);
    }
  });

  let sortedArtists = Object.keys(totalStreams).sort(function (
    artistA,
    artistB
  ) {
    let artistAVotes = totalStreams[artistA];
    let artistBvotes = totalStreams[artistB];

    if (artistAVotes < artistBvotes) {
      return 1;
    } else {
      return -1;
    }
  });

  let topArtist = sortedArtists[0];

  let topArtistSongs = top50.filter((song) => song.artist === topArtist);

  res.render("./pages/popularArtist", {
    title: "Most Popular Artist",
    topArtistSongs: topArtistSongs,
  });
});

//single song
app.get("/top50/song/:rank", (req, res) => {
  const rank = Number(req.params.rank);
  let song = top50.find((song) => song.rank === rank);

  if (song) {
    res.render("./pages/singleSong", {
      title: `Song #${rank}`,
      song: song,
    });
  } else {
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

//bookshelf with all the books
app.get("/books", (req, res) => {
  res.render("./pages/books", {
    title: "25 Books You Probably Read Already",
    books: books,
  });
});

//view a single book and its info
app.get("/books/book/:id", (req, res) => {
  const id = Number(req.params.id);
  let book = books.find((book) => book.id === id);

  if (book) {
    res.render("./pages/singleBook", {
      title: `${book.title}`,
      book: book,
    });
  } else {
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

//view all books by genre
app.get("/books/:genre", (req, res) => {
  const genre = req.params.genre;
  console.log(genre);
  let genreBooks = books.filter((book) => book.type === genre);
  console.log(genreBooks);

  if (genreBooks.length >= 1) {
    res.render("./pages/books", {
      title: `Book genre: ${genre}`,
      books: genreBooks,
    });
  } else {
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
