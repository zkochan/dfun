'use strict';

var expect = require('chai').expect;
var dfun = require('../lib');

describe('dfun', function () {
  it('should work with Number', function (done) {
    var fn = dfun(Number, function (a) {
      expect(a).to.be.equal(4);
      done();
    });
    fn(4);
  });
  
  it('should work with String', function (done) {
    var fn = dfun(String, function (a) {
      expect(a).to.be.equal('4');
      done();
    });
    fn('4');
  });
  
  it('should work with Boolean', function (done) {
    var fn = dfun(Boolean, function (a) {
      expect(a).to.be.equal(true);
      done();
    });
    fn(true);
  });
  
  it('should work with Array', function (done) {
    var fn = dfun(Array, function (a) {
      expect(a.length).to.be.equal(2);
      expect(a[0]).to.be.equal(1);
      expect(a[1]).to.be.equal(2);
      done();
    });
    fn([1, 2]);
  });
  
  it('should work with Function', function (done) {
    var noop = function () {};
    var fn = dfun(Function, function (a) {
      expect(a).to.be.equal(noop);
      done();
    });
    fn(noop);
  });
  
  it('should work with Date', function (done) {
    var date = new Date();
    var fn = dfun(Date, function (a) {
      expect(a.getMilliseconds()).to.be.equal(date.getMilliseconds());
      done();
    });
    fn(date);
  });
  
  it('should work with RegExp', function (done) {
    var regExp = new RegExp();
    var fn = dfun(RegExp, function (a) {
      expect(a instanceof RegExp).to.be.equal(true);
      done();
    });
    fn(regExp);
  });
  
  it('should work when middle argument is optional', function (done) {
    var fn = dfun(Number, [Number, 2], String, function (a, b, c) {
      expect(a).to.be.equal(4);
      expect(b).to.be.equal(2);
      expect(c).to.be.equal('5');
      done();
    });
    fn(4, '5');
  });
});