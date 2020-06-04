const { top50 } = require("./top50");
const ARTISTSTREAM = {};

function mostPopular() {
  top50.forEach((data) => {
    data.artist in ARTISTSTREAM
      ? (ARTISTSTREAM[data.artist] += data.streams)
      : (ARTISTSTREAM[data.artist] = data.streams);
  });

  const sortable = [];
  for (let artist in ARTISTSTREAM) {
    sortable.push([artist, ARTISTSTREAM[artist]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortable[0][0];
}

function songsOfTheMostPopular(mostPopular) {
  return top50.filter((data) => data.artist === mostPopular);
}

const popularArtist = songsOfTheMostPopular(mostPopular());
module.exports = { popularArtist };
