var path = require('path'),
    validate = require(path.join(__dirname,'..','src/validate.js')),
    assert = require('assert');

describe('placeName', function(){

  it('valid placeName', function() {
    assert.doesNotThrow(function() {
      validate.placeName({
        from: '2000-01-01',
        to: '9999-12-31',
        name: 'Yup'
      });
    });
  });

  it('invalid placeName - non-object', function() {
    assert.throws(function(){
      validate.placeName([]);
    },function(error) {
      return error.message == 'must be an object';
    });
  });

  it('invalid placeName - empty object', function() {
    assert.throws(function(){
      validate.placeName({});
    },function(error) {
      return error.message == 'from, to, and name must be the only keys';
    });
  });

  it('invalid placeName - missing from', function() {
    assert.throws(function(){
      validate.placeName({
        bob: '2000-01-01',
        to: '9999-12-31',
        name: 'Yup'
      });
    },function(error) {
      return error.message == 'from is required';
    });
  });

  it('invalid placeName - integer as from', function() {
    assert.throws(function(){
      validate.placeName({
        from: 20000101,
        to: '9999-12-31',
        name: 'Yup'
      });
    },function(error) {
      return error.message == 'from must be a string';
    });
  });

  it('invalid placeName - invalid from', function() {
    assert.throws(function(){
      validate.placeName({
        from: 'bogus',
        to: '9999-12-31',
        name: 'Yup'
      });
    },function(error) {
      return error.message == 'from must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid placeName - missing to', function() {
    assert.throws(function(){
      validate.placeName({
        from: '2000-01-01',
        bob: '9999-12-31',
        name: 'Yup'
      });
    },function(error) {
      return error.message == 'to is required';
    });
  });

  it('invalid placeName - integer as to', function() {
    assert.throws(function(){
      validate.placeName({
        from: '2000-01-01',
        to: 20000101,
        name: 'Yup'
      });
    },function(error) {
      return error.message == 'to must be a string';
    });
  });

  it('invalid placeName - invalid to', function() {
    assert.throws(function(){
      validate.placeName({
        from: '2000-01-01',
        to: 'bogus',
        name: 'Yup'
      });
    },function(error) {
      return error.message == 'to must have a format of (-)YYYY-MM-DD';
    });
  });

  it('invalid placeName - missing name', function() {
    assert.throws(function(){
      validate.placeName({
        from: '2000-01-01',
        to: '9999-12-31',
        bob: 'Yup'
      });
    },function(error) {
      return error.message == 'name is required';
    });
  });

  it('invalid placeName - non-string as name', function() {
    assert.throws(function(){
      validate.placeName({
        from: '2000-01-01',
        to: '9999-12-31',
        name: {}
      });
    },function(error) {
      return error.message == 'name must be a string';
    });
  });

  it('invalid placeName - empty-string as name', function() {
    assert.throws(function(){
      validate.placeName({
        from: '2000-01-01',
        to: '9999-12-31',
        name: ''
      });
    },function(error) {
      return error.message == 'name must not be empty string';
    });
  });

});