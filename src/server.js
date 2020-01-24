const http = require('http');
const fs = require('fs');
const search = require('./search.js');
const parseQuery = require('./router.js');

const TAB_SIZE = 4;
const FILE = './restaurants.json';

const OK = 200;
const BAD_REQUEST = 400;
const METHOD_NOT_ALLOWED = 405;

function getAllRestaurants(path) {
  const raw = fs.readFileSync(path);
  const data = JSON.parse(raw);
  return data.restaurants;
}

function createEndpoint(restaurants) {
  return function searchHandle(req, res) {
	console.log(req);
    res.setHeader('Content-Type', 'application/json');
	const query = parseQuery(req.url);
	let status = OK;
	if (req.method !== 'POST') {
		status = METHOD_NOT_ALLOWED
	} else if (query === null) {
		status = BAD_REQUEST;
	}
	if (status !== OK) {
		res.writeHead(status, { 'Content-Type': 'text/plain' });
		res.end("Hire me!");
		return;
	}
	res.writeHead(status);
    res.write(JSON.stringify(
      restaurants.filter(search(query.str, query.lat, query.lon)),
      null,
      TAB_SIZE,
    ));
    res.end();
  };
}

http.createServer(createEndpoint(getAllRestaurants('./restaurants.json'))).listen(process.env.PORT, () => {
});

// For testing
module.exports = getAllRestaurants;
