const arrowLeftBook = document.body.querySelector("#arrow-left-book");
const arrowRightBook = document.body.querySelector("#arrow-right-book");

arrowLeftBook.addEventListener("click", leftB);
arrowRightBook.addEventListener("click", rightB);

function leftB(e) {
  const path = e.srcElement.baseURI.split("/");
  let newPage = parseInt(path[path.length - 1]);
  newPage--;
  if (newPage < 101 || newPage > 125) {
    newPage = parseInt(path[path.length - 1]);
  }
  const newRoute = path.slice(0, path.length - 1);
  newRoute.push(newPage);
  location.replace(newRoute.join("/"));
}

function rightB(e) {
  const path = e.srcElement.baseURI.split("/");
  let newPage = parseInt(path[path.length - 1]);
  newPage++;
  if (newPage < 101 || newPage > 125) {
    newPage = parseInt(path[path.length - 1]);
  }
  const newRoute = path.slice(0, path.length - 1);
  newRoute.push(newPage);
  location.replace(newRoute.join("/"));
}
