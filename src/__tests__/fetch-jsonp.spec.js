import fetchJsonp from '../fetch-jsonp';

const FIXTURES_BASE_PATH = 'base';

describe('Fet JSONP module specifications', function() {
  const fetch = fetchJsonp();

  beforeEach(function(){
    window.dummy = function(json) {
      return json;
    };
  });

  afterEach(function(){
    delete window.dummy;
  });

  it('should catch error when JSONP request fails', function(done) {
    fetch('non-existing.jsonp')
    .then(res => {
      fail('JSONP request should fail')
      done();
    })
    .catch(err => {
      expect(err).toBeTruthy();
      done();
    });
  });

  it('should return JSON response', function(done) {
    fetch(`${FIXTURES_BASE_PATH}/fixtures/existing.js`, {jsonpCallbackFunction: 'dummy'})
    .then(res => {
      return res.json();
    })
    .then(json => {
      expect(json.a).toBe(1);
      done();
    })
    .catch(err => {
      fail('JSONP request should NOT fail');
      done();
    });
  });
});
