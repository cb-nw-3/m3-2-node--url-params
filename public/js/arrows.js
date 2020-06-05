const arrowLeft = document.body.querySelector('#arrow-left-song');
const arrowRight = document.body.querySelector('#arrow-right-song');
arrowLeft.addEventListener('click', left);
arrowRight.addEventListener('click', right);

function left(e) {
  const path = e.srcElement.baseURI.split('/');
  let newPage = parseInt(path[path.length - 1]);
  newPage--;
  if (newPage < 1 || newPage > 50) {
    newPage = parseInt(path[path.length - 1]);
  }
  const newRoute = path.slice(0, path.length - 1);
  newRoute.push(newPage);
  location.replace(newRoute.join('/'));
}

function right(e) {
  const path = e.srcElement.baseURI.split('/');
  let newPage = parseInt(path[path.length - 1]);
  newPage++;
  if (newPage < 1 || newPage > 50) {
    newPage = parseInt(path[path.length - 1]);
  }
  const newRoute = path.slice(0, path.length - 1);
  newRoute.push(newPage);
  location.replace(newRoute.join('/'));
}
