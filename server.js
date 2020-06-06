"use strict";

const morgan = require("morgan");

const express = require("express");

const { top50 } = require("./data/top50");

const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
// ############################ EXERCISE 1 #################################
app.get("/top50", (req, res) => {
  const title = "Top 50 Songs Streamted on Spotify";
  res.render("pages/top50", { title: title, rank: top50 });
});

// app.get('/top50/popular-artist', (req,res) => {
//   const title = "Most Popular Artist"
//   res.render('pages/top50', {title: title, rank: top50.sort((songA,songB) => {
//     if(songA.streams < songB.streams) {
//       return 1;
//     }
//     if(songA.streams > songB.streams) {
//       return -1;
//     }
//     return 0;
//   })});
// })

app.get("/top50/popular-artist", (req, res) => {
  const title = "Most Popular Artist";

  // this sorts out the artists by occurences
  let count = {};
  top50.forEach((song) => {
    count[song.artist] = (count[song.artist] || 0) + 1;
  });

  // console.log(count);

  //this creates a sorted array from the most popular artist to least
  //based on the above occurences of their hits on the top50 data
  let final = Object.keys(count).sort((a, b) => {
    let countA = count[a];
    let countB = count[b];
    // (countA < countB) ? 1 : -1;
    if (countA < countB) {
      return 1;
    } else {
      return -1;
    }
  });

  //choose to most popular artist
  let topArtist = final.slice(0, 1);
  //console.log(topArtist);

  let obj = [];
  // let result = top50.filter(song => {
  //   for(let i = 0; i< topArtist.length; i++) {
  //     if(song.artist == topArtist[i]) {
  //       obj.push(song);
  //     };
  //   }
  // })

  //return a new array of objects that only have songs from the top artist
  let result = top50.filter((song) => {
    if (song.artist == topArtist) {
      obj.push(song);
    }
  });

  res.render("pages/top50", { title: title, rank: obj });
});

for (let i = 1; i <= 50; i++) {
  app.get(`/top50/song/${i}`, (req, res) => {
    const title = `Song #${i}`;
    const song = top50.filter((song) => song.rank === i);
    console.log(song);
    res.render("partials/song-page", { title: title, rank: song });
  });
}

// ############################ EXERCISE 2.1 #################################

//render all books lists with descriptions
app.get("/books", (req, res) => {
  const title = "My Books";
  res.render("pages/allBooks", { title: title, booklist: books });
});

console.log(books.length);

//render individual book pages
// for (let i = 101; i <= 101 + books.length; i++) {
//   app.get(`/books/${i}`, (req, res) => {
//     const title = `Book #${i}`;
//     const bookPage = books.filter((book) => book.id === i);
//     console.log("currently displaying", bookPage);
//     res.render("pages/allBooks", { title: title, booklist: bookPage });
//   });
// }

app.get("/books/:id", (req, res) => {
  //create a list of possible ids
  let idParams = Number(req.params.id);
  const id = books.map((book) => book.id);
  let bookPage = books.filter((book) => book.id === idParams);
  let title = `Book #${idParams}`;

  let isLastPage = idParams === 125;
  let isFirstPage = idParams === 101;

  console.log(bookPage);
  //console.log(id);
  console.log(req.params.id);

  if (id.includes(idParams)) {
    res.render("pages/book-page", {
      title: title,
      booklist: bookPage,
      isLastPage: isLastPage,
      isFirstPage: isFirstPage,
    });
  } else {
    res.status(404);
    res.redirect("/404");
  }
  //res.send(req.params.id);
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
