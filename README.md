JSONP is NOT supported in standard Fetch API, https://fetch.spec.whatwg.org.
ac-fetch-jsonp provides you the API to execute JSONP requests that is similar to native Fetch API.
This library has been inspired by [fetch-jsonp](https://github.com/camsong/fetch-jsonp.git).

If you need a `fetch` polyfill for old browsers, try [github/fetch](http://github.com/github/fetch).

## Installation

You can install with `npm`.

```
npm install ac-fetch-jsonp
```

## Promise Polyfill for IE

IE9/10/11 does not support [ES6 Promise](https://tc39.github.io/ecma262/#sec-promise-constructor), run this to polyfill the global environment at the beginning of your application.

```js
require('es6-promise').polyfill();
```

## Usage

The `fetchJsonp` function supports ONLY GET HTTP method.

### Fetch JSONP in simple way

```javascript
var fetch = fetchJsonp();

fetch('/some-jsonp-url')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  console.log('json response', json);
})
.catch(function(ex) {
  console.log('failed', ex);
});
```

### Set JSONP request timeout, default is 5000ms

```javascript
var fetch = fetchJsonp();

fetch('/some-jsonp-url', {timeout: 3000})
.then(function(response) {
  return response.json();
})
.then(function(json) {
  console.log('json response', json);
})
.catch(function(ex) {
  console.log('failed', ex);
});
```

NOTE: timeout option is not supported in the native Fetch API.

### Set JSONP callback parameter name, default is ```callback```

```javascript
var fetch = fetchJsonp();

fetch('/some-jsonp-url', {jsonp: 'cb'})
.then(function(response) {
  return response.json();
})
.then(function(json) {
  console.log('json response', json);
})
.catch(function(ex) {
  console.log('failed', ex);
});
```

### Passing Promise implementation, default is window.Promise, make sure you pass custom implementation if the browser doesn't support ES6 Promise.

```javascript
var fetch = fetchJsonp({Promise: CustomPromise});

fetch('/some-jsonp-url', {jsonpCallbackFunction: 'myCallback'})
.then(function(response) {
  return response.json();
})
.then(function(json) {
  console.log('json response', json);
})
.catch(function(ex) {
  console.log('failed', ex);
});
```

### Caveats

You need to call ```response.json()``` before processing the JSON data. This is required to be consistent with Fetch API.

## Browser Support

Chrome | Firefox | IE | Opera | Safari
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | 6.1+ ✔ |

# License

MIT

# Acknowledgement

Thanks to [github/fetch](https://github.com/github/fetch) for bring Fetch to old browsers.
