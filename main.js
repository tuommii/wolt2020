// const http = require('http');
// const qs = require('querystring');
const fs = require('fs');

// TODO: Validate blurhash
function getAllRestaurants() {
  const raw = fs.readFileSync('./restaurants.json');
  const data = JSON.parse(raw);
  return data.restaurants;
}

function searchFromName(name, keyword) {
  return name.toUpperCase().includes(keyword.toUpperCase());
}

function searchFromDescription(desc, keyword) {
  return desc.toUpperCase().includes(keyword.toUpperCase());
}

function searchKeyword(keyword) {
  return function filterByKeyword(elem) {
    // let result = false;
    if (searchFromName(elem.name, keyword)) {
      return (true);
    } if (searchFromDescription(elem.description, keyword)) {
      return (true);
    }
    // TODO: Change this also
    let i = 0;
    while (i < elem.tags.length) {
      if (elem.tags[i].toUpperCase().includes(keyword)) {
        return true;
      }
      i += 1;
    }
    return (false);
  };
}
console.log(getAllRestaurants().filter(searchKeyword('AFRICAN')));
// console.log(filterRestaurants(getAllRestaurants(), { str: 'KAIVO' }));

// Test this
// function getQuery(str) {
//   const obj = qs.parse(str);
//   const query = {
//     str: obj['/search?q'],
//     lat: obj.lat,
//     lon: obj.lon,
//   };
//   return query;
// }

// /restaurants/search?q=sushi&lat=60.17045&lon=24.93147
// function homeHandle(req, res) {
//   const { url } = req;
//   if (url === '/about') {
//     res.write('ABOUT!');
//     res.end();
//   } else if (url === '/contact') {
//     res.write('ABOUT!');
//     res.end();
//   } else if (url === '/favicon.ico') {
//     // Do nothing
//   } else {
//     const query = getQuery(req.url);
//     res.write(JSON.stringify(query));
//     res.end();
//   }
// }

// http.createServer(homeHandle).listen(process.env.PORT, () => {

// });
