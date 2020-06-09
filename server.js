"use strict";

const express = require("express");
const morgan = require("morgan");

const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", (req, res) => {
  //req=request, res=response
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    theTop50Songs: top50,
  });
});

//q1.6
// app.get("/top50/song/:songId", (req, res) => {
//   const theSong = top50[req.params.songId - 1];
//   res.render("pages/getSong", {
//     title: "Songs #" + req.params.songId,
//     theSong: theSong,
//   });
// });

//q1.7
app.get("/top50/song/:songId", (req, res) => {
  const theSong = top50[req.params.songId - 1];
  if (req.params.songId < 1 || req.params.songId > 50) {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  } else {
    res.render("pages/getSong", {
      title: "Songs #" + req.params.songId,
      theSong: theSong,
    });
  }
});

//forEach 5- songs look for the most popular artist and show songs
app.get("/top50/popular-artist", (req, res) => {
  let mostPopularArtist = findMostRecurentElementInArrayOfObjects(top50);

  let songsOfTheMostPopularArtist = [];

  top50.forEach((element) => {
    if (mostPopularArtist == element.artist) {
      songsOfTheMostPopularArtist.push(element);
    }
  });

  res.render("pages/topArtist", {
    theTopArtistSongs: songsOfTheMostPopularArtist,
    title: "Most Popular Artist",
  });
});

// Exercises-2 /books

const { books } = require("./data/books");
app.get("/books", (req, res) => {
  //req=request, res=response
  res.render("pages/books", {
    title: "All books",
    allTheBooks: books,
  });
});

app.get("/books/:booksId", (req, res) => {
  const theBook = books[req.params.booksId - 100 - 1];
  if (req.params.booksId >= 101 || req.params.booksId <= 125) {
    res.render("pages/book", {
      title: "Book info" + req.params.booksId,
      ejsTheBook: theBook,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

app.get("/books/types/:bookType", (req, res) => {
  const desiredType = req.params.bookType;
  let theBooksOfTheDesiredType = [];
  books.forEach((element) => {
    if (element.type == desiredType) {
      theBooksOfTheDesiredType.push(element);
    }
  });

  res.render("pages/bookTypes", {
    title: "The book types",
    allTheBooksOfDesiredType: theBooksOfTheDesiredType,
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

// In this case we look for the most popular artist inside our top50 array of objects
function findMostRecurentElementInArrayOfObjects(theArray) {
  let mostFrequent = 1;
  let current = 0;
  let item;

  for (let index = 0; index < theArray.length; index++) {
    for (let y = index; y < theArray.length; y++) {
      if (theArray[index].artist == theArray[y].artist) {
        current++;
      }
      if (mostFrequent < current) {
        mostFrequent = current;
        item = theArray[index].artist;
      }
    }
    current = 0;
  }
  return item;
}
