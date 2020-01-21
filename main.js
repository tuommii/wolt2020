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
  return name.toUpperCase().includes(keyword);
}
function searchFromDescription(desc, keyword) {
  return desc.toUpperCase().includes(keyword);
}

// TODO: LEN 1
function filterRestaurants(restaurants, query) {
  let i = 0;
  const results = [];
  const keyword = query.str.toUpperCase();
  while (i < restaurants.length) {
    if (searchFromName(restaurants[i].name, keyword)
    || searchFromDescription(restaurants[i].description, keyword)) {
      results.push(restaurants[i]);
    } else {
      let j = 0;
      while (j < restaurants[i].tags.length) {
        if (restaurants[i].tags[j].toUpperCase().includes(keyword)) {
          results.push(restaurants[i]);
        }
        j += 1;
      }
    }
    i += 1;
  }
  return results;
}

// getAllRestaurants();
console.log(filterRestaurants(getAllRestaurants(), { str: 'KAIVO' }));

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
