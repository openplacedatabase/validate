var path = require('path'),
    validate = require(path.join(__dirname,'..','src/validate.js')),
    fs = require('fs'),
    geojsonDir = path.join(__dirname,'geojson'),
    assert = require('assert');

describe('GeoJSON', function(){

  it('invalid GeoJSON', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'invalid.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'The type property is required and was not found';
    });
  });

  it('valid GeoJSON - point', function() {
    assert.doesNotThrow(function() {
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-point.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    });
  });

  it('invalid GeoJSON - point', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'invalid-point.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'position must have 2 or more elements';
    });
  });

  it('valid GeoJSON - polygon', function() {
    assert.doesNotThrow(function() {
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-polygon.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    });
  });

  it('valid GeoJSON - polygon holes', function() {
    assert.doesNotThrow(function() {
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-polygon-holes.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    });
  });

  it('invalid GeoJSON - polygon', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'invalid-polygon.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'a LinearRing of coordinates needs to have four or more positions';
    });
  });

  it('valid GeoJSON - multipolygon', function() {
    assert.doesNotThrow(function() {
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-multipolygon.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    });
  });

  it('invalid GeoJSON - linestring', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-linestring.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'only Point, Polygon, and MultiPolygon are allowed';
    });
  });

  it('invalid GeoJSON - multilinestring', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-multilinestring.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'only Point, Polygon, and MultiPolygon are allowed';
    });
  });

  it('invalid GeoJSON - geometryCollection', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-geometrycollection.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'only Point, Polygon, and MultiPolygon are allowed';
    });
  });

  it('invalid GeoJSON - feature', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-feature.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'only Point, Polygon, and MultiPolygon are allowed';
    });
  });

  it('invalid GeoJSON - featureCollection', function() {
    assert.throws(function(){
      var geojsonStr = fs.readFileSync(path.join(geojsonDir,'valid-featurecollection.geojson'));
          geojson = JSON.parse(geojsonStr);
      validate.geojson(geojson);
    },function(error) {
      return error.message == 'only Point, Polygon, and MultiPolygon are allowed';
    });
  });

});
