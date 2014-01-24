# opd-validate
Open Place Database place and geojson validation library.

[![dependencies](https://david-dm.org/openplacedatabase/validate.png)](https://david-dm.org/openplacedatabase/validate)

## Install
````
npm install opd-validate --save
````

## Run Tests
````
npm run test
````

## Example
````javascript
var validate = require('opd-validate');

try {
  validate.place(placeObject);
} catch(error) {
  console.log(error);
}
````

# Methods

## place(obj, [pre-save])
Throws an error if the place object is not valid.
If the optional `pre-save` parameter equals `true`, run additional check to ensure a proper format before saving.

## placeName(obj)
Throws an error if the place.names object is not valid.

## placeGeoJSON(obj)
Throws an error if the place.geojsons object is not valid.
Note that this will not validate the existence of the id, just the formatting.

## placeSource(str)
Throws an error if the place.sources object is not valid.

## date(str)
Throws an error if the date string does not match the standard for OPD.

## geojson(obj)
Throws an error if the geojson object is invalid, or is not one of Point, Polygon, or MultiPolygon.