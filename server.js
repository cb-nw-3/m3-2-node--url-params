"use strict";

const express = require("express");
const morgan = require("morgan");
const { top50 } = require("./data/top50");
const PORT = process.env.PORT || 8000;

const q1 = (req, res) => {
  const title = "Top 50 Songs Streamed on Spotify";
  res.render("./pages/top50", { title });
};

const app = express();

// app.get("/", function (req, res) {
//   res.send("You are at the Home Page!!!");
// });
app.get("/", q1);
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
