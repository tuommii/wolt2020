const assert = require('assert');
const search = require('../src/search.js');
const getAllRestaurants = require('../src/getAllRestaurants');

const HIVE = [60.180771, 24.9560864];
// Over 3km
const PASILA = [60.200535, 24.9254208];
const LON = 1;
const LAT = 0;

describe('search()', () => {
  const restaurants = getAllRestaurants('restaurants.json');

  describe('getAllRestaurants should load', () => {
    it('array of 50 objects', () => {
      assert.equal(restaurants.length, 50);
    });
  });

  describe('If customer\'s location is @Hive', () => {
    it('and no keyword provided, 50 restautants should be returned', () => {
      const hive = restaurants.filter(search('', HIVE[LAT], HIVE[LON]));
      assert.equal(hive.length, 50);
    });
    it('with keyword KäSINtehty 1 restautants should be returned', () => {
      const hive = restaurants.filter(search('KäSINtehty', HIVE[LAT], HIVE[LON]));
      assert.equal(hive.length, 1);
    });
    it('with keyword PREMIUM 2 restautants should be returned', () => {
      const hive = restaurants.filter(search('PREMIUM', HIVE[LAT], HIVE[LON]));
      assert.equal(hive.length, 2);
    });
  });

  describe('If customer\'s location is @Pasila', () => {
    it('and no keyword provided, 0 restautants should be returned', () => {
      const pasila = restaurants.filter(search('', PASILA[LAT], PASILA[LON]));
      assert.equal(pasila.length, 0);
    });
    it('with keyword fries, 0 restautants should be returned', () => {
      const pasila = restaurants.filter(search('fries', PASILA[LAT], PASILA[LON]));
      assert.equal(pasila.length, 0);
    });
  });
});
