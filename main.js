// const http = require('http');
// const qs = require('querystring');
const fs = require('fs');

const NEAR = 3.0;
const KM = 1.609344;
const MIN_KEYWORD_LEN = 1;
// Indexes in location array
const LON = 0;
const LAT = 1;

function getAllRestaurants() {
  const raw = fs.readFileSync('./restaurants.json');
  const data = JSON.parse(raw);
  return data.restaurants;
}

// https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2);
  dist += Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= KM;
  return dist;
}

function searchFromName(name, keyword) {
  return name.toUpperCase().includes(keyword.toUpperCase());
}

function searchFromDescription(desc, keyword) {
  return desc.toUpperCase().includes(keyword.toUpperCase());
}

function searchFromTags(tags, keyword) {
  let i = 0;
  while (i < tags.length) {
    if (tags[i].toUpperCase().includes(keyword.toUpperCase())) {
      return true;
    }
    i += 1;
  }
  return false;
}

// Check not 0
function isNear(value, location, lat, lon) {
  return (distance(location[LAT], location[LON], lat, lon) < value);
}

// MIN_LEN 1
// Maybe MAX_LEN
function search(keyword, lat, lon) {
  return function applyFilters(elem) {
    if (!(isNear(NEAR, elem.location, lat, lon))) {
      return (false);
    }
    if (keyword.length < MIN_KEYWORD_LEN) {
      return (true);
    }
    if (searchFromName(elem.name, keyword)) {
      return (true);
    } if (searchFromDescription(elem.description, keyword)) {
      return (true);
    } if (searchFromTags(elem.tags, keyword)) {
      return (true);
    }
    // let i = 0;
    // while (i < elem.tags.length) {
    //   if (elem.tags[i].toUpperCase().includes(keyword)) {
    //     return true;
    //   }
    //   i += 1;
    // }
    return (false);
  };
}
const arr = getAllRestaurants().filter(search('', 60.19062649, 24.90092468));
console.log(arr);
// arr.forEach((elem) => {
//   // console.log(elem.location[0]);
//   // console.log(elem.location[1]);
//   if (distance(elem.location[1], elem.location[0], 60.19062649, 24.90092468, 'K') < 3.0) {
//     console.log(elem);
//   }
// });


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
