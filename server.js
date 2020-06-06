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
//top50
app.get("/top50", (req, res) => {
    const title = "Top 50 Songs Streamed on Spotify";
    top50: top50;

    res.render("./pages/top50", { title, top50 });
});

//popular artist
app.get("/top50/popular-artist", (req, res) => {
    const title = "The Most Popular Artist";
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

    const rakingArtists = [];
    Object.values(artistCount).forEach((count, id) => {
        const artist = Object.keys(artistCount)[id];
        rakingArtists.push({
            artist: artist,
            count: count,
        });
    });
    const theMostPopularArtist = rakingArtists.sort(
        (a, b) => b.count - a.count
    )[0].artist;

    res.render("./pages/popular-artist", {
        title,
        songs: top50.filter((song) => song.artist === theMostPopularArtist),
    });
});

//song
let songNumber = app.get("/top50/song:rank", (req, res) => {
    const rank = req.params.rank - 1;
    let previous = rank - 1;
    let next = rank + 1;
    if (top50[rank]) {
        const title = `Song #${top50[rank].rank}`;
        res.render("pages/song", {
            title,
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

//books exercise
const { books } = require("./data/books");

app.get("/books", (req, res) => {
    const title = "List of Books";
    books: books;

    res.render("./pages/books", { books, title });
});

//books by id

app.get("/book/:id", (req, res) => {
    const id = req.params.id;
    if (books[id]) {
        res.render("pages/book", {
            book: books[id],
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
