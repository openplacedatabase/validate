var path = require('path'),
    validate = require(path.join(__dirname,'..','src/validate.js')),
    fs = require('fs'),
    geojsonDir = path.join(__dirname,'geojson'),
    assert = require('assert');

describe('GeoJSON', function(){
/*
  it('valid GeoJSON - point', function() {
    assert.doesNotThrow(function() {
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-point.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.placeGeoJSON(geojson);
    });
  });

  it('invalid GeoJSON - point', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'invalid-point.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.placeGeoJSON(geojson);
    },function(error) {
      return error.message == 'must be an object';
    });
  });
*/

});
