var validate = require(__dirname + '/../src/validate.js'),
    assert = require('assert');

describe('placeName', function(){

  it('valid placeName', function() {
    assert.doesNotThrow(function() {
      validate.placeName({
        from: '2000-01-01',
        to: '9999-12-31',
        name:'Yup'
      });
    });
  });

  it('invalid placeName - empty object', function() {
    assert.throws(function(){
      validate.placeName({});
    },function(error) {
      return error.message == 'Date must have a format of (-)YYYY-MM-DD';
    });
  });

  //test blank name

});
