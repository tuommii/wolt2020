const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const search = require('./search.js');

function getAllRestaurants() {
  const raw = fs.readFileSync('./restaurants.json');
  const data = JSON.parse(raw);
  return data.restaurants;
}

// const arr = getAllRestaurants().filter(search('', 60.19062649, 24.90092468));
// console.log(arr);


// Test this
function getQuery(str) {
  const obj = qs.parse(str);
  const query = {
    str: obj['/search?q'],
    lat: obj.lat,
    lon: obj.lon,
  };
  return query;
}

function testaa(restaurants) {
  return function searchHandle2(req, res) {
    const { url } = req;
    if (url === '/favicon.ico') {
      // Prevent logging
    } else {
      const arr = req.url.split('/restaurants');
      if (arr.length === 2) {
        const query = getQuery(arr[1]);
        if (query.str === undefined) {
          query.str = '';
        }
        res.write(JSON.stringify(query));
        res.end();
        return;
      }
      // const results = restaurants.filter(search(query.str, query.lat, query.lon));
      res.write('Hire Me!');
      res.end();
    }
  };
}
// http://localhost:3000/search?q=dsdsd&lat=60.17045&lon=24.93147
// Blurhash
http.createServer(testaa(getAllRestaurants())).listen(process.env.PORT, () => {
  // getAllRestaurants();
});
