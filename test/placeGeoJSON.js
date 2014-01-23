var path = require('path'),
    validate = require(path.join(__dirname,'..','src/validate.js')),
    assert = require('assert');

describe('placeGeoJSON', function(){

  it('valid placeGeoJSON', function() {
    assert.doesNotThrow(function() {
      validate.placeGeoJSON({
        from: '2000-01-01',
        to: '9999-12-31',
        id: '1'
      });
    });
  });

  it('invalid placeGeoJSON - non-object', function() {
    assert.throws(function(){
      validate.placeGeoJSON([]);
    },function(error) {
      return error.message == 'must be an object';
    });
  });

  it('invalid placeGeoJSON - empty object', function() {
    assert.throws(function(){
      validate.placeGeoJSON({});
    },function(error) {
      return error.message == 'from, to, and id must be the only keys';
    });
  });

  it('invalid placeGeoJSON - missing from', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        bob: '2000-01-01',
        to: '9999-12-31',
        id: '1'
      });
    },function(error) {
      return error.message == 'from is required';
    });
  });

  it('invalid placeGeoJSON - integer as from', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: 20000101,
        to: '9999-12-31',
        id: '1'
      });
    },function(error) {
      return error.message == 'from must be a string';
    });
  });

  it('invalid placeGeoJSON - invalid from', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: 'bogus',
        to: '9999-12-31',
        id: '1'
      });
    },function(error) {
      return error.message == 'from must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid placeGeoJSON - missing to', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: '2000-01-01',
        bob: '9999-12-31',
        id: '1'
      });
    },function(error) {
      return error.message == 'to is required';
    });
  });

  it('invalid placeGeoJSON - integer as to', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: '2000-01-01',
        to: 20000101,
        id: '1'
      });
    },function(error) {
      return error.message == 'to must be a string';
    });
  });

  it('invalid placeGeoJSON - invalid to', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: '2000-01-01',
        to: 'bogus',
        id: '1'
      });
    },function(error) {
      return error.message == 'to must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid placeGeoJSON - missing id', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: '2000-01-01',
        to: '9999-12-31',
        bob: '1'
      });
    },function(error) {
      return error.message == 'id is required';
    });
  });

  it('invalid placeGeoJSON - non-string as id', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: '2000-01-01',
        to: '9999-12-31',
        id: {}
      });
    },function(error) {
      return error.message == 'id must be a string';
    });
  });

  it('invalid placeGeoJSON - empty-string as id', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: '2000-01-01',
        to: '9999-12-31',
        id: ''
      });
    },function(error) {
      return error.message == 'id must not be empty string';
    });
  });

  it('invalid placeGeoJSON - non-alphanumeric as id', function() {
    assert.throws(function(){
      validate.placeGeoJSON({
        from: '2000-01-01',
        to: '9999-12-31',
        id: '#$%'
      });
    },function(error) {
      return error.message == 'id must be alphanumeric';
    });
  });


});
