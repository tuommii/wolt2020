const fs = require("fs");
const assert = require("assert");
const search = require("../src/search.js");
const getAllRestaurants = require("../src/db.js");

const PASILA = [60.2006685, 24.9253993];
const EIRA = [60.1560565, 24.9374314];

// function getAllRestaurants(path) {
// 	const raw = fs.readFileSync(path);
// 	const data = JSON.parse(raw);
// 	return data.restaurants;
// }

describe("search", () => {

	let restaurants = getAllRestaurants("restaurants.json");

	it("50 restaurants object loaded", () => {
	  assert.equal(restaurants.length, 50);
	});
});
