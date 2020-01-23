const qs = require('querystring');

function createQuery(str) {
  const obj = qs.parse(str);
  const query = {
    str: obj['/search?q'],
    lat: obj.lat,
    lon: obj.lon,
  };
  return query;
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

function parseQuery(url) {
  if (!url.startsWith('/restaurants/'))
    return (null);
  const arr = url.split('/restaurants');
  if (arr.length !== 2) {
    return null;
  }
  const query = createQuery(arr[1]);
  if (isQueryValid(query))
    return query;
  return null;
}

module.exports = parseQuery;
