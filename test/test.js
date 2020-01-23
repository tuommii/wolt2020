const assert = require('assert');
const parseQuery = require('../src/parser.js');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('parseQuery', () => {
  const url = "/restaurants/search?q=sushi";
  const url2 = "/error/search?q=sushi&lat=60.17045&lon=24.93147";
  const url3 = "/restaurants/";
  const url4 = "/restaurants/search?q=&lat=60.17045&lon=24.93147";
  const url5 = "/restaurants/search?q=sushi&lat=&lon=24.93147";
  const url6 = "/restaurants/search?q=sushi&lat=60.17045&lon=";
  const url7 = "/restaurants/search?q=sushi&lat=abc&lon=24.93147";
  const url8 = "/restaurants/search?q=sushi&lat=60.17045&lon=abc";

  describe('null tests', () => {
    it("should return null if no lat and lon provided", () => {
      assert.equal(parseQuery(url), null);
    });
    it("should return null if url doesn't start with /restaurants/", () => {
      assert.equal(parseQuery(url2), null);
    });
    // NOTE: Maybe change this to return all restaurants
    it("should return null if url contains only /restaurants/", () => {
      assert.equal(parseQuery(url3), null);
    });
    it("should return null if no querystring provided", () => {
      assert.equal(parseQuery(url4), null);
    });
    it("should return null if no lat provided", () => {
      assert.equal(parseQuery(url5), null);
    });
    it("should return null if no lon provided", () => {
      assert.equal(parseQuery(url6), null);
    });
    it("should return null if lat is NaN", () => {
      assert.equal(parseQuery(url7), null);
    });
    it("should return null if lon is NaN", () => {
      assert.equal(parseQuery(url8), null);
    });
  });

  describe('legal tests', () => {
    const url = "/restaurants/search?q=sushi&lat=60.17045&lon=24.93147";
    const url2 = "/restaurants/search?q=sushi&lat=60.17045&lon=24.93147&name=miikka";
    const wanted = {
      str: "sushi",
      lat: "60.17045",
      lon: "24.93147"
    };
    it("should be valid if all data is provided", () => {
      assert.deepEqual(parseQuery(url), wanted);
    });
    it("should be valid if extra data is also provided", () => {
      assert.deepEqual(parseQuery(url2), wanted);
    });
  });

});
