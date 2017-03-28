const cli = require('../bin/cli');
const assert = require('assert');

describe('CLI', function () {
  describe('indexOf', function () {
    it('should return index 2', function () {
      const _index = cli.indexOf(['sds', 'asd', '23', 'ae'], /^\d+$/);
      assert.equal(_index, 2);
    });

    it('should return index 2 with number value', function () {
      const _index = cli.indexOf(['sds', 'asd', 23, 'ae'], /^\d+$/);
      assert.equal(_index, 2);
    });
  });
});

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
