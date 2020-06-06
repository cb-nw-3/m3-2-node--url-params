"use strict";

const express = require("express");
const morgan = require("morgan");

const { top50 } = require("./data/top50");
const { books } = require("./data/books");
const { popularArtist } = require("./data/popularArtist");
let bookTypes = {};
books.forEach((element) =>
  element.type in bookTypes
    ? bookTypes[`${element.type}`]++
    : (bookTypes[`${element.type}`] = 1)
);

const PORT = process.env.PORT || 8000;
const home = (req, res) => res.render("pages/home");
const top50page = (req, res) => res.render("pages/top50", { top50 });
const songPage = (req, res) => {
  const path = req.params[0];
  if (
    parseInt(path[0]) >= 1 &&
    parseInt(path[0]) <= 50 &&
    path[0].length <= 2
  ) {
    const song = top50.find((element) => element.rank === parseInt(path[0]));
    res.render("pages/song", { song });
  } else if (path.length <= 3) {
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
};

const songsOfMostPopular = (req, res) =>
  res.render("pages/popular", { popularArtist });

const bookList = (req, res) => res.render("pages/bookList", { books });
const bookType = (req, res) =>
  res.render("pages/bookType", { books, bookTypes });
const bookPage = (req, res) => {
  const path = req.params[0].split("/");
  if (
    parseInt(path[0]) >= 100 &&
    parseInt(path[0]) <= 125 &&
    path[0].length === 3
  ) {
    const book = books.find((element) => element.id === parseInt(path[0]));
    res.render("pages/book", { book });
  } else {
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
};

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here

app.get("/", home);
app.get("/top50", top50page);
app.get("/top50/song/*", songPage);
app.get("/top50/popular-artist", songsOfMostPopular);

app.get("/books", bookList);
app.get("/books/bytype", bookType);
app.get("/book/*", bookPage);

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
