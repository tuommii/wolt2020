const http = require('http');
const fs = require('fs');
const search = require('./search.js');
const parseQuery = require('./router.js');
const getAllRestaurants = require('./db.js');

const FILE = './restaurants.json';
const OK = 200;
const BAD_REQUEST = 400;
const METHOD_NOT_ALLOWED = 405;
const TAB_SIZE = 4;

function getStatus(method, query) {
	let status = OK;
	if (method !== 'POST') {
		status = METHOD_NOT_ALLOWED
	} else if (query === null) {
		status = BAD_REQUEST;
	}
	return status;
}

function createEndpoint(restaurants) {
	return function searchHandle(req, res) {
		console.log(req);
		res.setHeader('Content-Type', 'application/json');
		const query = parseQuery(req.url);
		const status = getStatus(req.method, query);
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

http.createServer(createEndpoint(getAllRestaurants(FILE))).listen(process.env.PORT, () => {
});
