"use strict";
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./public")));
//above __dirname indicates to follow directory by name wherever it is
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// endpoints here
app.get("/books", (req, res) => {
  res.render("pages/books", {
    title: "Book Selection",
    books: books,
  });
});

app.get("/books/:id", (req, res) => {
  console.log(req.params);
  const isTheBookFromParams = (book) => book.id === +req.params.id;
  const book = books.find(isTheBookFromParams);
  if (book) {
    res.render("pages/book_details", {
      title: "Book details",
      book: book,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

app.get("/books/:type", (req, res) => {
  console.log(req.params);
  const isTheBookFromParams = (book) => book.type === req.params.type;
  const book = books.find(isTheBookFromParams);
  if (book) {
    res.render("pages/book_type", {
      title: "Book by Type",
      book: book,
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
