const assert = require("assert");
const search = require("../src/search.js");
const getAllRestaurants = require("../src/server");

describe("search", () => {
	const restaurants = getAllRestaurants
    const url = "/restaurants/search?q=sushi&lat=60.17045&lon=24.93147";
    const url2 = "/restaurants/search?q=sushi&lat=60.17045&lon=24.93147&name=miikka";
    const query = {
      str: "sushi",
      lat: "60.17045",
      lon: "24.93147",
	};

	search(anted)

    it("should be valid if all data is provided", () => {
      assert.deepEqual(parseQuery(url), wanted);
    });
    it("should be valid if extra data is also provided", () => {
      assert.deepEqual(parseQuery(url2), wanted);
    });
  });
