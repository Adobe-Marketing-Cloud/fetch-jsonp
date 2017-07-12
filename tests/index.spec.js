import fetchJsonp from '../src/index';

const JSONP_URL = 'http://www.flickr.com/services/feeds/photos_public.gne?format=json';

describe('Fetch JSONP module specifications', function() {
  let createElement;
  const fetch = fetchJsonp();

  beforeEach(function(){
    createElement = document.createElement;
  });

  afterEach(function(){
    document.createElement = createElement;
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
    fetch(JSONP_URL, {jsonp: 'jsoncallback', timeout: 3000})
    .then(res => {
      return res.json();
    })
    .then(json => {
      expect(json).not.toBeNull();
      done();
    })
    .catch(err => {
      fail('JSONP request should NOT fail');
      done();
    });
  });

  it('should fail with request timeout', function(done) {
    fetch(JSONP_URL, {jsonp: 'jsoncallback', timeout: 3})
    .then(res => {
      return res.json();
    })
    .then(json => {
      fail('JSONP request should fail because of timeout');
      done();
    })
    .catch(err => {
      expect(err).not.toBeNull();
      done();
    });
  });
});
