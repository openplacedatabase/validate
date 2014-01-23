var path = require('path'),
    validate = require(path.join(__dirname,'..','src/validate.js')),
    assert = require('assert');

describe('placeSource', function(){

  it('valid placeSource', function() {
    assert.doesNotThrow(function() {
      validate.placeSource('Yup');
    });
  });

  it('invalid placeSource - non-string', function() {
    assert.throws(function(){
      validate.placeSource([]);
    },function(error) {
      return error.message == 'must be a string';
    });
  });

  it('invalid placeSource - empty-string', function() {
    assert.throws(function(){
      validate.placeSource('');
    },function(error) {
      return error.message == 'must not be empty string';
    });
  });

});