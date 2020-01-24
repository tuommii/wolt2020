/* eslint quotes: [2, "double"] */

const assert = require("assert");
const parseQuery = require("../src/parseQuery");

describe("parseQuery()", () => {
  describe("should return null", () => {
    const url = "/restaurants/search?q=sushi";
    const url2 = "/error/search?q=sushi&lat=60.17045&lon=24.93147";
    const url3 = "/restaurants/";
    const url4 = "/restaurants/search?q=&lat=60.17045&lon=24.93147";
    const url5 = "/restaurants/search?q=sushi&lat=&lon=24.93147";
    const url6 = "/restaurants/search?q=sushi&lat=60.17045&lon=";
    const url7 = "/restaurants/search?q=sushi&lat=abc&lon=24.93147";
    const url8 = "/restaurants/search?q=sushi&lat=60.17045&lon=abc";

    it("if no lat and lon provided", () => {
      assert.equal(parseQuery(url), null);
    });
    it("if url doesn't start with /restaurants/", () => {
      assert.equal(parseQuery(url2), null);
    });
    // NOTE: Maybe change this to return all restaurants
    it("if url contains only /restaurants/", () => {
      assert.equal(parseQuery(url3), null);
    });
    it("if no querystring provided", () => {
      assert.equal(parseQuery(url4), null);
    });
    it("if no lat provided", () => {
      assert.equal(parseQuery(url5), null);
    });
    it("if no lon provided", () => {
      assert.equal(parseQuery(url6), null);
    });
    it("if lat is NaN", () => {
      assert.equal(parseQuery(url7), null);
    });
    it("if lon is NaN", () => {
      assert.equal(parseQuery(url8), null);
    });
  });

  describe("query should be valid", () => {
    const url = "/restaurants/search?q=sushi&lat=60.17045&lon=24.93147";
    const url2 = "/restaurants/search?q=sushi&lat=60.17045&lon=24.93147&name=miikka";
    const wanted = {
      str: "sushi",
      lat: "60.17045",
      lon: "24.93147",
    };
    it("if all data is provided", () => {
      assert.deepEqual(parseQuery(url), wanted);
    });
    it("if extra data is also provided", () => {
      assert.deepEqual(parseQuery(url2), wanted);
    });
  });
});
