"use strict";

const express = require("express");

const morgan = require("morgan");

const { top50 } = require("./data/top50");

const PORT = process.env.PORT || 8000;

const app = express();

const title = "Top 50 Songs Streamed on Spotify";

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/", (req, res) => {
  res.render("pages/top50.ejs", { title: title, top50: top50 });
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
