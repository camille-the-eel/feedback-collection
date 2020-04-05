//Write a function to retrieve a blob of JSON
//Make an AJAX request! Use the 'fetch' function (from the route below)
// https://rallycoding.herokuapp.com/api/music_albums

// whenever we make a req with fetch, fetch returns a promise, that promise is resolved(responds) with an object that represents the underlying req (i.e. the res found .then())
// anytime we work with a promise, in order to get a "notification" or callback that the promise has been resolved, we use a .then() statement
function fetchAlbums() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    // .json() has it's own promise (for once the json data is ready for us to use it), so we use another .then() on that
    .then(json => console.log(json));
}

fetchAlbums();

// ES2017 Syntax Refactor  -- Async Await

let fetchAlbums = async() => {
    // taking the request, and assigning what it resolves to (response), to a variable
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
}

fetchAlbums();
