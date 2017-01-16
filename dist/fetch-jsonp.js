(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fetchJsonp"] = factory();
	else
		root["fetchJsonp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction getCallbackId() {\n  return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);\n}\n\nfunction getScriptId() {\n  return 'script_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);\n}\n\nfunction createScript(url, id) {\n  var script = document.createElement('script');\n  script.type = 'text/javascript';\n  script.async = true;\n  script.id = id;\n  script.src = url;\n\n  return script;\n}\n\nfunction removeScript(id) {\n  var script = document.getElementById(id);\n  var parent = script.parentNode;\n\n  try {\n    if (parent) {\n      parent.removeChild(script);\n    }\n  } catch (e) {\n    // ignore\n  }\n}\n\nfunction removeCallback(id) {\n  delete window[id];\n}\n\nfunction appendScript(script) {\n  var firstScript = document.getElementsByTagName('script')[0];\n  firstScript.parentNode.insertBefore(script, firstScript);\n}\n\nfunction fetchJsonpInternal(url, options, promise) {\n  return new promise(function (resolve, reject) {\n    var timeout = options.timeout || 5000;\n    var param = options.jsonpCallback || 'callback';\n    var callbackId = options.jsonpCallbackFunction || getCallbackId();\n    var scriptUrl = [url, url.indexOf('?') === -1 ? '?' : '&', param, '=', callbackId].join('');\n    var scriptId = getScriptId();\n    var script = createScript(scriptUrl, scriptId);\n\n    var timeoutId = setTimeout(function () {\n      reject(new Error('JSONP request to ' + url + ' timed out'));\n\n      removeCallback(callbackId);\n      removeScript(scriptId);\n    }, timeout);\n\n    var disableTimeout = function disableTimeout(timeoutId) {\n      return clearTimeout(timeoutId);\n    };\n\n    window[callbackId] = function (response) {\n      resolve({\n        ok: true,\n        json: function json() {\n          return Promise.resolve(response);\n        }\n      });\n\n      disableTimeout(timeoutId);\n      removeCallback(callbackId);\n      removeScript(scriptId);\n    };\n\n    script.addEventListener('error', function (e) {\n      reject(new Error('JSONP request to ' + url + ' failed ' + e));\n\n      disableTimeout(timeoutId);\n      removeCallback(callbackId);\n      removeScript(scriptId);\n    });\n\n    appendScript(script);\n  });\n}\n\nfunction fetchJsonp(settings) {\n  return function (url) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    var promise = settings && settings.Promise || self.Promise;\n\n    return fetchJsonpInternal(url, options, promise);\n  };\n}\n\nexports.default = fetchJsonp;\nmodule.exports = exports['default'];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmV0Y2gtanNvbnAuanM/YWU0YyJdLCJuYW1lcyI6WyJnZXRDYWxsYmFja0lkIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiZ2V0U2NyaXB0SWQiLCJjcmVhdGVTY3JpcHQiLCJ1cmwiLCJpZCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJhc3luYyIsInNyYyIsInJlbW92ZVNjcmlwdCIsImdldEVsZW1lbnRCeUlkIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZSIsInJlbW92ZUNhbGxiYWNrIiwid2luZG93IiwiYXBwZW5kU2NyaXB0IiwiZmlyc3RTY3JpcHQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluc2VydEJlZm9yZSIsImZldGNoSnNvbnBJbnRlcm5hbCIsIm9wdGlvbnMiLCJwcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRpbWVvdXQiLCJwYXJhbSIsImpzb25wQ2FsbGJhY2siLCJjYWxsYmFja0lkIiwianNvbnBDYWxsYmFja0Z1bmN0aW9uIiwic2NyaXB0VXJsIiwiaW5kZXhPZiIsImpvaW4iLCJzY3JpcHRJZCIsInRpbWVvdXRJZCIsInNldFRpbWVvdXQiLCJFcnJvciIsImRpc2FibGVUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlc3BvbnNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZldGNoSnNvbnAiLCJzZXR0aW5ncyIsInNlbGYiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsYUFBVCxHQUF5QjtBQUN2QixvQkFBZ0JDLEtBQUtDLEdBQUwsRUFBaEIsU0FBOEJDLEtBQUtDLElBQUwsQ0FBVUQsS0FBS0UsTUFBTCxLQUFnQixNQUExQixDQUE5QjtBQUNEOztBQUVELFNBQVNDLFdBQVQsR0FBdUI7QUFDckIscUJBQWlCTCxLQUFLQyxHQUFMLEVBQWpCLFNBQStCQyxLQUFL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UUFqQixpQkFBYWQsTUFBYjtBQUNELEdBckNNLENBQVA7QUFzQ0Q7O0FBRUQsU0FBUzBDLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO0FBQzVCLFNBQU8sVUFBQzdDLEdBQUQsRUFBdUI7QUFBQSxRQUFqQnFCLE9BQWlCLHVFQUFQLEVBQU87O0FBQzVCLFFBQU1DLFVBQVV1QixZQUFZQSxTQUFTSixPQUFyQixJQUFnQ0ssS0FBS0wsT0FBckQ7O0FBRUEsV0FBT3JCLG1CQUFtQnBCLEdBQW5CLEVBQXdCcUIsT0FBeEIsRUFBaUNDLE9BQWpDLENBQVA7QUFDRCxHQUpEO0FBS0Q7O2tCQUVjc0IsVSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Q2FsbGJhY2tJZCgpIHtcbiAgcmV0dXJuIGBqc29ucF8ke0RhdGUubm93KCl9XyR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApfWA7XG59XG5cbmZ1bmN0aW9uIGdldFNjcmlwdElkKCkge1xuICByZXR1cm4gYHNjcmlwdF8ke0RhdGUubm93KCl9XyR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApfWA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNjcmlwdCh1cmwsIGlkKSB7XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgc2NyaXB0LmlkID0gaWQ7XG4gIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgcmV0dXJuIHNjcmlwdDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU2NyaXB0KGlkKSB7XG4gIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgY29uc3QgcGFyZW50ID0gc2NyaXB0LnBhcmVudE5vZGU7XG5cbiAgdHJ5IHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoc2NyaXB0KTsgIFxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGlnbm9yZVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNhbGxiYWNrKGlkKSB7XG4gIGRlbGV0ZSB3aW5kb3dbaWRdO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoc2NyaXB0KSB7XG4gIGNvbnN0IGZpcnN0U2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICBmaXJzdFNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGZpcnN0U2NyaXB0KTtcbn0gXG5cbmZ1bmN0aW9uIGZldGNoSnNvbnBJbnRlcm5hbCh1cmwsIG9wdGlvbnMsIHByb21pc2UpIHsgIFxuICByZXR1cm4gbmV3IHByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgNTAwMDtcbiAgICBjb25zdCBwYXJhbSA9IG9wdGlvbnMuanNvbnBDYWxsYmFjayB8fCAnY2FsbGJhY2snO1xuICAgIGNvbnN0IGNhbGxiYWNrSWQgPSBvcHRpb25zLmpzb25wQ2FsbGJhY2tGdW5jdGlvbiB8fCBnZXRDYWxsYmFja0lkKCk7XG4gICAgY29uc3Qgc2NyaXB0VXJsID0gW3VybCwgKHVybC5pbmRleE9mKCc/JykgPT09IC0xKSA/ICc/JyA6ICcmJywgcGFyYW0sICc9JywgY2FsbGJhY2tJZF0uam9pbignJyk7XG4gICAgY29uc3Qgc2NyaXB0SWQgPSBnZXRTY3JpcHRJZCgpO1xuICAgIGNvbnN0IHNjcmlwdCA9IGNyZWF0ZVNjcmlwdChzY3JpcHRVcmwsIHNjcmlwdElkKTtcbiAgICBcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoYEpTT05QIHJlcXVlc3QgdG8gJHt1cmx9IHRpbWVkIG91dGApKTtcbiAgICAgIFxuICAgICAgcmVtb3ZlQ2FsbGJhY2soY2FsbGJhY2tJZCk7XG4gICAgICByZW1vdmVTY3JpcHQoc2NyaXB0SWQpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgY29uc3QgZGlzYWJsZVRpbWVvdXQgPSB0aW1lb3V0SWQgPT4gY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG5cbiAgICB3aW5kb3dbY2FsbGJhY2tJZF0gPSByZXNwb25zZSA9PiB7XG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIGpzb246ICgpID0+IFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcbiAgICAgIH0pO1xuXG4gICAgICBkaXNhYmxlVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgcmVtb3ZlQ2FsbGJhY2soY2FsbGJhY2tJZCk7XG4gICAgICByZW1vdmVTY3JpcHQoc2NyaXB0SWQpO1xuICAgIH07XG5cbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlKSB7XG4gICAgICByZWplY3QobmV3IEVycm9yKGBKU09OUCByZXF1ZXN0IHRvICR7dXJsfSBmYWlsZWQgJHtlfWApKTtcblxuICAgICAgZGlzYWJsZVRpbWVvdXQodGltZW91dElkKTtcbiAgICAgIHJlbW92ZUNhbGxiYWNrKGNhbGxiYWNrSWQpO1xuICAgICAgcmVtb3ZlU2NyaXB0KHNjcmlwdElkKTtcbiAgICB9KTtcblxuICAgIGFwcGVuZFNjcmlwdChzY3JpcHQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZmV0Y2hKc29ucChzZXR0aW5ncykge1xuICByZXR1cm4gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHNldHRpbmdzICYmIHNldHRpbmdzLlByb21pc2UgfHwgc2VsZi5Qcm9taXNlO1xuXG4gICAgcmV0dXJuIGZldGNoSnNvbnBJbnRlcm5hbCh1cmwsIG9wdGlvbnMsIHByb21pc2UpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZXRjaEpzb25wO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ZldGNoLWpzb25wLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ])
});
;