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

function parseURL(url) {
  const arr = url.split('/restaurants');
  if (arr.length !== 2) {
    return null;
  }
  const query = getQuery(arr[1]);
  console.log(query);
  if (query.str === undefined || query.lat == undefined || query.lon == undefined) {
    return null;
  }
  if (isNaN(query.lat) || isNaN(query.lon)) {
	  return null;
  }
  if (!query.str.length)
    return null;
	return query
}

function testaa(restaurants) {
	return function searchHandle(req, res) {
		const { url } = req;
		if (url === '/favicon.ico') {
			// Prevent logging
		} else {
			//   const arr = req.url.split('/restaurants');
			//   if (arr.length === 2) {
				//     const query = getQuery(arr[1]);
				//     if (query.str === undefined) {
					//       query.str = '';
					//     }
    const query = parseURL(url);
    if (query === null)
    {
      res.write('{"message": "Error in query"}');
      res.end();
      return ;
    }
		console.log(query);
    res.write(JSON.stringify(restaurants.filter(search(query.str, query.lat, query.lon))));
    res.end();
    return;
    }
      // const results = restaurants.filter(search(query.str, query.lat, query.lon));
    //   res.write('Hire Me!');
    //   res.end();
  };
}
// http://localhost:3000/search?q=dsdsd&lat=60.17045&lon=24.93147
// Blurhash
http.createServer(testaa(getAllRestaurants())).listen(process.env.PORT, () => {
  // getAllRestaurants();
});
