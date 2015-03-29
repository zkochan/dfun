'use strict';

var expect = require('chai').expect;
var def = require('../lib');

describe('def', function () {
  it('should work when middle argument is optional', function (done) {
    var fn = def(Number, [Number, 2], String, function (a, b, c) {
      expect(a).to.be.equal(4);
      expect(b).to.be.equal(2);
      expect(c).to.be.equal('5');
      done();
    });
    fn(4, '5');
  });
});