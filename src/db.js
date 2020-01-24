const fs = require('fs');

function getAllRestaurants(path) {
  const raw = fs.readFileSync(path);
  const data = JSON.parse(raw);
  return data.restaurants;
}

module.exports = getAllRestaurants;
