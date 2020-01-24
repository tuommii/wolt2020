
const distance = require('./distance.js');

const NEAR = 3.0;
// Indexes in restaurants location array
const LON = 0;
const LAT = 1;

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

function isNear(maxDistance, location, lat, lon) {
  return (distance(location[LAT], location[LON], lat, lon) < maxDistance);
}

function search(keyword, lat, lon) {
  return function applyFilters(restaurant) {
    // Doesn't matter if keyword is found when distance is >= NEAR
    if (!(isNear(NEAR, restaurant.location, lat, lon))) {
      return (false);
    }
    if (searchFromName(restaurant.name, keyword)) {
      return (true);
    } if (searchFromDescription(restaurant.description, keyword)) {
      return (true);
    } if (searchFromTags(restaurant.tags, keyword)) {
      return (true);
    }
    return (false);
  };
}

module.exports = search;
