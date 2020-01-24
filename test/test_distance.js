const assert = require('assert');
const distance = require('../src/distance.js');

const LON = 1;
const LAT = 0;
const WOLT = [60.1704502, 24.929392];
const HIVE = [60.180771, 24.9560864];

describe('distance()', () => {
  describe('Between Hive Helsinki and Wolt Helsinki', () => {
    it('distance should be greater than 1.8km', () => {
      assert(distance(WOLT[LAT], WOLT[LON], HIVE[LAT], HIVE[LON]) > 1.8);
    });
    it('distance should be less than 1.9km', () => {
      assert(distance(WOLT[LAT], WOLT[LON], HIVE[LAT], HIVE[LON]) < 1.9);
    });
  });
});
