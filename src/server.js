const http = require('http');
const fs = require('fs');
const search = require('./search.js');
const parseQuery = require('./router.js');

const TAB_SIZE = 4;

function getAllRestaurants() {
  const raw = fs.readFileSync('./restaurants.json');
  const data = JSON.parse(raw);
  return data.restaurants;
}

function createEndpoint(restaurants) {
  return function searchHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const query = parseQuery(req.url);
    if (query === null || req.method !== 'POST') {
      res.write('{"message": "Error"}');
      res.end();
      return;
    }
    res.write(JSON.stringify(
      restaurants.filter(search(query.str, query.lat, query.lon)),
      null,
      TAB_SIZE,
    ));
    res.end();
  };
}
// http://localhost:3000/search?q=dsdsd&lat=60.17045&lon=24.93147
http.createServer(createEndpoint(getAllRestaurants())).listen(process.env.PORT, () => {
});
