/* eslint quotes: [2, "double"] */
const assert = require("assert");
const search = require("../src/search.js");
const getAllRestaurants = require("../src/db.js");

const PASILA = [60.200535, 24.9254208];
const EIRA = [60.1560565, 24.9374314];
const KAMPPI = [60.1674847, 24.9308692];
const MM = [60.1796275, 24.9905754];
const LON = 1;
const LAT = 0;


// function getAllRestaurants(path) {
// const raw = fs.readFileSync(path);
// const data = JSON.parse(raw);
// return data.restaurants;
// }


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
  dist *= 1.609344;
  return dist;
}

describe("search", () => {
  const restaurants = getAllRestaurants("restaurants.json");

  // const eira = restaurants.filter(search("", EIRA[LAT], EIRA[LON]));
  it("Distance", () => {
    assert.equal(calcDistance(PASILA[LAT], PASILA[LON], KAMPPI[LAT], KAMPPI[LON]), 1);
  });
  it("Distance", () => {
    assert.equal(calcDistance(PASILA[LAT], PASILA[LON], EIRA[LAT], EIRA[LON]), 1);
  });
  it("50 restaurants loaded", () => {
    assert.equal(restaurants.length, 50);
  });
  it("50 restaurants near Kamppi", () => {
    const kamppi = restaurants.filter(search("", KAMPPI[LAT], KAMPPI[LON]));
    assert.equal(kamppi.length, 50);
  });
  it("0 restaurants near Pasila", () => {
    const pasila = restaurants.filter(search("", PASILA[LAT], PASILA[LON]));
    console.log(pasila);
    assert.equal(pasila.length, 0);
  });
  // it("1 restaurants with keyword KäSINtehty near Kamppi", () => {
  //   const keyword = "KäSINtehty";
  //   const kamppi = restaurants.filter(search(keyword, KAMPPI[LAT], KAMPPI[LON]));
  //   assert.equal(kamppi.length, 1);
  // });
  // it("8 restaurants with keyword Japan near Kamppi", () => {
  //   const keyword = "Japan";
  //   const kamppi = restaurants.filter(search(keyword, KAMPPI[LAT], KAMPPI[LON]));
  //   assert.equal(kamppi.length, 8);
  // });
  // it("2 restaurants with keyword premium near Kamppi", () => {
  //   const keyword = "premium";
  //   const kamppi = restaurants.filter(search(keyword, KAMPPI[LAT], KAMPPI[LON]));
  //   assert.equal(kamppi.length, 2);
  // });
  // it("Mustikkamaa", () => {
  //   const kamppi = restaurants.filter(search("", MM[LAT], MM[LON]));
  //   console.log(kamppi);
  //   assert.equal(kamppi.length, 2);
  // });
});
