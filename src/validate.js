var _ = require('underscore')._,
    geoAssert = require('geojson-assert'),
    validator = require('validator');

var validate = {};
module.exports = validate;

/**
 * This will validate a place.names element.
 */
validate.placeName = function(obj) {

  // Validate the overall object
  if(!_.isObject(obj) || _.isArray(obj) || _.isFunction(obj)) throw new Error("must be an object");
  
  if(Object.keys(obj).length != 3) throw new Error("from, to, and name must be the only keys");
  
  // Validate from
  if(_.isUndefined(obj.from)) throw new Error("from is required");
  
  if(!_.isString(obj.from)) throw new Error("from must be a string");

  try {
    validate.date(obj.from);
  } catch(e) {
    throw new Error("from "+e.message);
  }
  
  // Validate to
  if(_.isUndefined(obj.to)) throw new Error("to is required");
  
  if(!_.isString(obj.to)) throw new Error("to must be a string");

  try {
    validate.date(obj.to);
  } catch(e) {
    throw new Error("to "+e.message);
  }
  
  // Validate name
  if(_.isUndefined(obj.name)) throw new Error("name is required");
  
  if(!_.isString(obj.name)) throw new Error("name must be a string");

  if(obj.name == "") throw new Error("name must not be empty string");
}

/**
 * This will validate a place.geojsons element.
 */
validate.placeGeoJSON = function(obj) {

  // Validate the overall object
  if(!_.isObject(obj) || _.isArray(obj) || _.isFunction(obj)) throw new Error("must be an object");
  
  if(Object.keys(obj).length != 3) throw new Error("from, to, and id must be the only keys");
  
  // Validate from
  if(_.isUndefined(obj.from)) throw new Error("from is required");
  
  if(!_.isString(obj.from)) throw new Error("from must be a string");

  try {
    validate.date(obj.from);
  } catch(e) {
    throw new Error("from "+e.message);
  }
  
  // Validate to
  if(_.isUndefined(obj.to)) throw new Error("to is required");
  
  if(!_.isString(obj.to)) throw new Error("to must be a string");

  try {
    validate.date(obj.to);
  } catch(e) {
    throw new Error("to "+e.message);
  }
  
  // Validate id
  if(_.isUndefined(obj.id)) throw new Error("id is required");
  
  if(!_.isString(obj.id)) throw new Error("id must be a string");

  if(obj.id == "") throw new Error("id must not be empty string");

  if(!/^\w+$/.test(obj.id)) throw new Error("id must be alphanumeric");
}

/**
 * This will validate a place.sources element.
 */
validate.placeSource = function(str) {

  if(!_.isString(str)) throw new Error("must be a string");

  if(str == "") throw new Error("must not be empty string");
}

/**
 * This will validate a place.
 */
validate.place = function(obj) {
  
  // Validate the overall object
  if(!_.isObject(obj) || _.isArray(obj) || _.isFunction(obj)) throw new Error("must be an object");

  // Validate id
  if(_.isUndefined(obj.id)) throw new Error("id is required");
  
  if(!_.isString(obj.id) || !validator.isUUID(obj.id,4)) throw new Error("id must be a uuidv4 string");

  // Validate version
  if(_.isUndefined(obj.version)) throw new Error("version is required");

  if(obj.version !== 1) throw new Error("version 1 (integer) is the only version supported right now");

  // Validate names
  if(_.isUndefined(obj.names)) throw new Error("names is required");

  if(!_.isArray(obj.names)) throw new Error("names must be an array");

  for(var x in obj.names) {
    try {
      validate.placeName(obj.names[x]);
    } catch(e) {
      throw new Error("names["+x+"]: "+e.message);
    }
  }

  // Validate geojsons
  if(_.isUndefined(obj.geojsons)) throw new Error("geojsons is required");

  if(!_.isArray(obj.geojsons)) throw new Error("geojsons must be an array");

  for(var x in obj.geojsons) {
    try {
      validate.placeGeoJSON(obj.geojsons[x]);
    } catch(e) {
      throw new Error("geojsons["+x+"]: "+e.message);
    }
  }

  // Validate sources
  if(_.isUndefined(obj.sources)) throw new Error("sources is required");

  if(!_.isArray(obj.sources)) throw new Error("sources must be an array");

  for(var x in obj.sources) {
    try {
      validate.placeSource(obj.sources[x]);
    } catch(e) {
      throw new Error("sources["+x+"]: "+e.message);
    }
  }

  // If a second parameter is passed in, perform a full pre-save validation
  if(arguments.length == 2 && arguments[1] == true) {

    // Validate last_edited_by
    if(_.isUndefined(obj.last_edited_by)) throw new Error("last_edited_by is required");

    if(!_.isString(obj.last_edited_by)) throw new Error("last_edited_by must be a string");

    if(obj.last_edited_by == "") throw new Error("last_edited_by must not be empty string");

    if(obj.last_edited_by.indexOf('-') == -1) throw new Error("last_edited_by must be formatted like {user-id} - {user-name}");
    
    var tmpUserId = obj.last_edited_by.substr(0,obj.last_edited_by.indexOf('-')).trim();
    var tmpUserName = obj.last_edited_by.substr(obj.last_edited_by.indexOf('-')).substr(1).trim();

    if(!/^\d+$/.test(tmpUserId)) throw new Error("last_edited_by - {user-id} must be numeric");

    if(tmpUserName == '') throw new Error("last_edited_by - {user-name} must not be blank");

    // Validate last_edited_time
    // future, to far in the past, int, etc.
    if(_.isUndefined(obj.last_edited_time)) throw new Error("last_edited_time is required");

    if(!_.isFinite(obj.last_edited_time) || _.isNaN(obj.last_edited_time) || parseInt(obj.last_edited_time) !== obj.last_edited_time) throw new Error("last_edited_time must be an integer");

    if(obj.last_edited_time < 1388538061000) throw new Error("last_edited_time must be in milliseconds and after Jan 1, 2014");

    if(obj.last_edited_time > (Date.now() + 5*60000)) throw new Error("last_edited_time must not be more than 5 minutes in the future");

    if(_.difference(
      Object.keys(obj),
      ['id', 'version', 'names', 'geojsons', 'sources', 'last_edited_by', 'last_edited_time']).length != 0
    ) throw new Error('only keys id, version, names, sources, geojsons, last_edited_by, and last_edited_time are allowed');
  } 
  // Not a pre-save validation, so make sure no extra fields get passed along
  else {
    if(_.union(
      Object.keys(obj),
      ['id', 'version', 'names', 'geojsons', 'sources', 'last_edited_by', 'last_edited_time']).length !== 7
    ) throw new Error('only keys id, version, names, sources, geojsons, last_edited_by(opt), and last_edited_time(opt) are allowed');
  }

}

/**
 * This will validate a geojson.
 * Note that only point, polygon, and multipolygon are allowed
 */
validate.geojson = function(obj) {

  geoAssert(obj);

  if(obj.type !== 'Point' && obj.type !== 'Polygon' && obj.type !== 'MultiPolygon') throw new Error('only Point, Polygon, and MultiPolygon are allowed');

}

/**
 * This will validate a date string
 */
validate.date = function(str) {
  if(!/^-?[1-9]\d{0,3}-\d{2}-\d{2}$/.test(str)) throw new Error("must have a format of (-)YYYY-MM-DD");
}