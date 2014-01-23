var path = require('path'),
    validate = require(path.join(__dirname,'..','src/validate.js')),
    assert = require('assert');

describe('date', function(){

  it('valid date: 2000-01-01', function() {
    assert.doesNotThrow(function() {
      validate.date('2000-01-01');
    });
  });

  it('valid date: -2000-01-01', function() {
    assert.doesNotThrow(function() {
      validate.date('-2000-01-01');
    });
  });

  it('invalid date - bogus', function() {
    assert.throws(function(){
      validate.date('bogus');
    },function(error) {
      return error.message == 'must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid date - 0000-01-01', function() {
    assert.throws(function(){
      validate.date('0000-01-01');
    },function(error) {
      return error.message == 'must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid date - 1000-001-01', function() {
    assert.throws(function(){
      validate.date('1000-001-01');
    },function(error) {
      return error.message == 'must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid date - 1000-1-01', function() {
    assert.throws(function(){
      validate.date('1000-1-01');
    },function(error) {
      return error.message == 'must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid date - 1000-01-001', function() {
    assert.throws(function(){
      validate.date('1000-01-001');
    },function(error) {
      return error.message == 'must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid date - 1000-01-1', function() {
    assert.throws(function(){
      validate.date('1000-01-1');
    },function(error) {
      return error.message == 'must have a format of (-)YYYY-MM-DD';
    });
  });
  

});
