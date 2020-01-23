const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const search = require('./search.js');

function getAllRestaurants() {
  const raw = fs.readFileSync('./restaurants.json');
  const data = JSON.parse(raw);
  return data.restaurants;
}

function getQuery(str) {
  const obj = qs.parse(str);
  const query = {
    str: obj['/search?q'],
    lat: obj.lat,
    lon: obj.lon,
  };
  return query;
}

function parseURL(url) {
  console.log(url);
  if (!url.startsWith('/restaurants/'))
    return (null);
  const arr = url.split('/restaurants');
  if (arr.length !== 2) {
    return null;
  }
  const query = getQuery(arr[1]);
  return query
}

function isQueryValid(query) {
  if (query === null)
    return false;
  if (query.str === undefined || query.lat == undefined || query.lon == undefined) {
    return false;
  }
  if (isNaN(query.lat) || isNaN(query.lon)) {
	  return false;
  }
  if (!query.str.length)
    return false;
  return true;
}

function createEndpoint(restaurants) {
	return function searchHandle(req, res) {
		const { url } = req;
		if (url === '/favicon.ico') {
			// Prevent logging
		}
    const query = parseURL(url);
    if (!isQueryValid(query)) {
      res.write('{"message": "Error"}');
      res.end();
      return;
    }
    res.write(JSON.stringify(restaurants.filter(search(query.str, query.lat, query.lon))));
    res.end();
  };
}
// http://localhost:3000/search?q=dsdsd&lat=60.17045&lon=24.93147
// Blurhash
http.createServer(createEndpoint(getAllRestaurants())).listen(process.env.PORT, () => {

});
