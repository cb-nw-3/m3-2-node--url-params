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

app.get(`/top50`, (req, res) => {
	console.log("test");

	res.render("pages/top50", {
		title: "Top 50 Songs Streamed on Spotify",
		top50: top50,
	});
});

app.get(`/top50/popular-artist`, (req, res) => {
	const artistCount = {};
	let artistWithMostSongs = null;
	let tempCount = 0;

	top50.forEach((song) => {
		if (artistCount.hasOwnProperty(song.artist)) {
			artistCount[song.artist] = artistCount[song.artist] + 1;
		} else {
			artistCount[song.artist] = 1;
		}
	});

	Object.entries(artistCount).forEach(([artist, artistCount]) => {
		if (artistCount > tempCount) {
			tempCount = artistCount;
			artistWithMostSongs = artist;
		}
	});

	const songs = top50.filter((song) => {
		if (song.artist === artistWithMostSongs) {
			return true;
		} else {
			return false;
		}
	});

	res.render("pages/popularArtist", {
		title: "Most Popular Artist",
		top50: songs,
	});
});

app.get("/top50/song/:rank", (req, res) => {
	const rank = req.params.rank - 1;
	if (top50[rank]) {
		res.render(`pages/songPage`, {
			title: `Song #${top50[rank].rank}`,
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

// handle 404s
app.get("*", (req, res) => {
	res.status(404);
	res.render("pages/fourOhFour", {
		title: "I got nothing",
		path: req.originalUrl,
	});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
