var _ = require('underscore')._,
    geoAssert = require('geojson-assert'),
    validator = require('validator');

var validate = {};
module.exports = validate;

validate.placeName = function(object) {
  throw new Error("Not implemented");
}

validate.placeGeoJSON = function(object) {
  throw new Error("Not implemented");
}

validate.placeSource = function(object) {
  throw new Error("Not implemented");
}

validate.place = function(object) {
  throw new Error("Not implemented");
}

validate.geojson = function(object) {
  throw new Error("Not implemented");
}

validate.date = function(str) {
  if(!/^-?[1-9]\d{0,3}-\d{2}-\d{2}$/.test(str)) throw new Error("Date must have a format of (-)YYYY-MM-DD");
}