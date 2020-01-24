
const NEAR = 3.0;
const KM = 1.609344;
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

// https://www.geodatasource.com/developers/javascript
function calcDistance(lat1, lon1, lat2, lon2) {
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

function isNear(distance, location, lat, lon) {
  return (calcDistance(location[LAT], location[LON], lat, lon) < distance);
}

function search(keyword, lat, lon) {
  return function applyFilters(elem) {
    // Doesn't matter if keyword is found when distance is >= 3.0
    if (!(isNear(NEAR, elem.location, lat, lon))) {
      return (false);
    }
    if (searchFromName(elem.name, keyword)) {
      return (true);
    } if (searchFromDescription(elem.description, keyword)) {
      return (true);
    } if (searchFromTags(elem.tags, keyword)) {
      return (true);
    }
    return (false);
  };
}

module.exports = search;
