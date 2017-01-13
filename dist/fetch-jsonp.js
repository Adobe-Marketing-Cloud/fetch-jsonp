(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.fetchJsonp = factory());
}(this, (function () { 'use strict';

function getCallbackId() {
  return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
}

function getScriptId() {
  return 'script_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
}

function createScript(url, id) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = id;
  script.src = url;

  return script;
}

function removeScript(id) {
  var script = document.getElementById(id);
  var parent = script.parentNode;

  try {
    if (parent) {
      parent.removeChild(script);
    }
  } catch (e) {
    // ignore
  }
}

function removeCallback(id) {
  delete window[id];
}

function appendScript(script) {
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
}

function fetchJsonp(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    var timeout = options.timeout || 5000;
    var param = options.jsonpCallback || 'callback';
    var callbackId = options.jsonpCallbackFunction || getCallbackId();
    var scriptUrl = [url, url.indexOf('?') === -1 ? '?' : '&', param, '=', callbackId].join('');
    var scriptId = getScriptId();
    var script = createScript(scriptUrl, scriptId);

    var timeoutId = setTimeout(function () {
      reject(new Error('JSONP request to ' + url + ' timed out'));

      removeCallback(callbackId);
      removeScript(scriptId);
    }, timeout);

    var disableTimeout = function disableTimeout(timeoutId) {
      return clearTimeout(timeoutId);
    };

    window[callbackId] = function (response) {
      resolve({
        ok: true,
        json: function json() {
          return Promise.resolve(response);
        }
      });

      disableTimeout(timeoutId);
      removeCallback(callbackId);
      removeScript(scriptId);
    };

    script.addEventListener('error', function (e) {
      reject(new Error('JSONP request to ' + url + ' failed ' + e));

      disableTimeout(timeoutId);
      removeCallback(callbackId);
      removeScript(scriptId);
    });

    appendScript(script);
  });
}

return fetchJsonp;

})));
