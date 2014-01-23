var path = require('path'),
    validate = require(path.join(__dirname,'..','src/validate.js')),
    assert = require('assert');

describe('place', function(){

  it('valid place', function() {
    assert.doesNotThrow(function() {
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    });
  });

  it('valid place - with allowed extras', function() {
    assert.doesNotThrow(function() {
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: Date.now()
      });
    });
  });

  it('invalid place - non-object', function() {
    assert.throws(function(){
      validate.place([]);
    },function(error) {
      return error.message == 'must be an object';
    });
  });

  it('invalid place - missing id', function() {
    assert.throws(function(){
      validate.place({
        bob: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'id is required';
    });
  });

  it('invalid place - invalid id type', function() {
    assert.throws(function(){
      validate.place({
        id: 1234,
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'id must be a uuidv4 string';
    });
  });

  it('invalid place - invalid id value', function() {
    assert.throws(function(){
      validate.place({
        id: '1234',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'id must be a uuidv4 string';
    });
  });

  it('invalid place - missing version', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        bob: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'version is required';
    });
  });

  it('invalid place - invalid version', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: '1',
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'version 1 (integer) is the only version supported right now';
    });
  });

  it('invalid place - missing names', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        bob: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'names is required';
    });
  });

  it('invalid place - invalid names - object', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: {
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        },
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'names must be an array';
    });
  });

  it('invalid place - invalid names -  missing from', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          bob: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'names[0]: from is required';
    });
  });

  it('invalid place - missing geojsons', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        bob: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'geojsons is required';
    });
  });

  it('invalid place - invalid geojsons - object', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: {
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        },
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'geojsons must be an array';
    });
  });

  it('invalid place - invalid geojsons - missing from', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          bob: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby']
      });
    },function(error) {
      return error.message == 'geojsons[0]: from is required';
    });
  });

  it('invalid place - missing sources', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        bob: ['sources baby']
      });
    },function(error) {
      return error.message == 'sources is required';
    });
  });

  it('invalid place - invalid sources - object', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: {}
      });
    },function(error) {
      return error.message == 'sources must be an array';
    });
  });

  it('invalid place - invalid sources - empty string', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['']
      });
    },function(error) {
      return error.message == 'sources[0]: must not be empty string';
    });
  });

  it('invalid place - too many elements', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        bogus: true
      });
    },function(error) {
      return error.message == 'only keys id, version, names, sources, geojsons, last_edited_by(opt), and last_edited_time(opt) are allowed';
    });
  });
  
  it('valid extended place', function() {
    assert.doesNotThrow(function() {
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: Date.now()
      },true);
    });
  });

  it('invalid extended place - missing last_edited_by', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        bob: '1 - Name Here',
        last_edited_time: Date.now()
      },true);
    },function(error) {
      return error.message == 'last_edited_by is required';
    });
  });

  it('invalid extended place - invalid last_edited_by', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: ['1 - Name Here'],
        last_edited_time: Date.now()
      },true);
    },function(error) {
      return error.message == 'last_edited_by must be a string';
    });
  });

  it('invalid extended place - blank last_edited_by', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '',
        last_edited_time: Date.now()
      },true);
    },function(error) {
      return error.message == 'last_edited_by must not be empty string';
    });
  });

  it('invalid extended place - invalid last_edited_by - missing "-"', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1  Name Here',
        last_edited_time: Date.now()
      },true);
    },function(error) {
      return error.message == 'last_edited_by must be formatted like {user-id} - {user-name}';
    });
  });

  it('invalid extended place - invalid last_edited_by - invalid user-id', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1b - Name Here',
        last_edited_time: Date.now()
      },true);
    },function(error) {
      return error.message == 'last_edited_by - {user-id} must be numeric';
    });
  });

  it('invalid extended place - invalid last_edited_by - invalid user-name', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - ',
        last_edited_time: Date.now()
      },true);
    },function(error) {
      return error.message == 'last_edited_by - {user-name} must not be blank';
    });
  });

  it('invalid extended place - missing last_edited_time', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        bob: Date.now()
      },true);
    },function(error) {
      return error.message == 'last_edited_time is required';
    });
  });

  it('invalid extended place - invalid last_edited_time - non number', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: '1234'
      },true);
    },function(error) {
      return error.message == 'last_edited_time must be an integer';
    });
  });

  it('invalid extended place - invalid last_edited_time - infinity', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: -Infinity
      },true);
    },function(error) {
      return error.message == 'last_edited_time must be an integer';
    });
  });

  it('invalid extended place - invalid last_edited_time - NaN', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: NaN
      },true);
    },function(error) {
      return error.message == 'last_edited_time must be an integer';
    });
  });

  it('invalid extended place - invalid last_edited_time - float', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: Date.now()+.234
      },true);
    },function(error) {
      return error.message == 'last_edited_time must be an integer';
    });
  });

  it('invalid extended place - invalid last_edited_time - to early', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: 1390517441
      },true);
    },function(error) {
      return error.message == 'last_edited_time must be in milliseconds and after Jan 1, 2014';
    });
  });

  it('invalid extended place - invalid last_edited_time - to late', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: (Date.now() + 10*60000)
      },true);
    },function(error) {
      return error.message == 'last_edited_time must not be more than 5 minutes in the future';
    });
  });

  it('invalid extended place - extra field', function() {
    assert.throws(function(){
      validate.place({
        id: 'c52e3854-182c-4bb2-9b73-60a6f0b31473',
        version: 1,
        names: [{
          from: '2000-01-01',
          to: '9999-12-31',
          name: 'Yup'
        }],
        geojsons: [{
          from: '2000-01-01',
          to: '9999-12-31',
          id: '1'
        }],
        sources: ['sources baby'],
        last_edited_by: '1 - Name Here',
        last_edited_time: Date.now(),
        bogus: true
      },true);
    },function(error) {
      return error.message == 'only keys id, version, names, sources, geojsons, last_edited_by, and last_edited_time are allowed';
    });
  });

});