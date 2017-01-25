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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction getCallbackId() {\n  return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);\n}\n\nfunction getScriptId() {\n  return 'script_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);\n}\n\nfunction createScript(url, id) {\n  var script = document.createElement('script');\n  script.type = 'text/javascript';\n  script.async = true;\n  script.id = id;\n  script.src = url;\n\n  return script;\n}\n\nfunction removeScript(id) {\n  var script = document.getElementById(id);\n  var parent = script.parentNode;\n\n  try {\n    parent && parent.removeChild(script);\n  } catch (e) {\n    // ignore\n  }\n}\n\nfunction removeCallback(id) {\n  delete window[id];\n}\n\nfunction appendScript(script) {\n  var firstScript = document.getElementsByTagName('script')[0];\n  firstScript.parentNode.insertBefore(script, firstScript);\n}\n\nfunction fetchJsonpInternal(url, options, promise) {\n  return new promise(function (resolve, reject) {\n    var timeout = options.timeout || 5000;\n    var param = options.jsonp || 'callback';\n    var callbackId = getCallbackId();\n    var scriptUrl = [url, url.indexOf('?') === -1 ? '?' : '&', param, '=', callbackId].join('');\n    var scriptId = getScriptId();\n    var script = createScript(scriptUrl, scriptId);\n\n    var timeoutId = setTimeout(function () {\n      reject(new Error('JSONP request to ' + url + ' timed out'));\n\n      removeCallback(callbackId);\n      removeScript(scriptId);\n    }, timeout);\n\n    var disableTimeout = function disableTimeout(timeoutId) {\n      return clearTimeout(timeoutId);\n    };\n\n    window[callbackId] = function (response) {\n      resolve({\n        ok: true,\n        json: function json() {\n          return Promise.resolve(response);\n        }\n      });\n\n      disableTimeout(timeoutId);\n      removeCallback(callbackId);\n      removeScript(scriptId);\n    };\n\n    script.addEventListener('error', function (e) {\n      reject(new Error('JSONP request to ' + url + ' failed ' + e));\n\n      disableTimeout(timeoutId);\n      removeCallback(callbackId);\n      removeScript(scriptId);\n    });\n\n    appendScript(script);\n  });\n}\n\nfunction fetchJsonp(settings) {\n  return function (url) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    var promise = settings && settings.Promise || self.Promise;\n\n    return fetchJsonpInternal(url, options, promise);\n  };\n}\n\nexports.default = fetchJsonp;\nmodule.exports = exports['default'];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmV0Y2gtanNvbnAuanM/YWU0YyJdLCJuYW1lcyI6WyJnZXRDYWxsYmFja0lkIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiZ2V0U2NyaXB0SWQiLCJjcmVhdGVTY3JpcHQiLCJ1cmwiLCJpZCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJhc3luYyIsInNyYyIsInJlbW92ZVNjcmlwdCIsImdldEVsZW1lbnRCeUlkIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZSIsInJlbW92ZUNhbGxiYWNrIiwid2luZG93IiwiYXBwZW5kU2NyaXB0IiwiZmlyc3RTY3JpcHQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluc2VydEJlZm9yZSIsImZldGNoSnNvbnBJbnRlcm5hbCIsIm9wdGlvbnMiLCJwcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRpbWVvdXQiLCJwYXJhbSIsImpzb25wIiwiY2FsbGJhY2tJZCIsInNjcmlwdFVybCIsImluZGV4T2YiLCJqb2luIiwic2NyaXB0SWQiLCJ0aW1lb3V0SWQiLCJzZXRUaW1lb3V0IiwiRXJyb3IiLCJkaXNhYmxlVGltZW91dCIsImNsZWFyVGltZW91dCIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZXNwb25zZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJmZXRjaEpzb25wIiwic2V0dGluZ3MiLCJzZWxmIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLGFBQVQsR0FBeUI7QUFDdkIsb0JBQWdCQyxLQUFLQyxHQUFMLEVBQWhCLFNBQThCQyxLQUFLQyxJQUFMLENBQVVELEtBQUtFLE1BQUwsS0FBZ0IsTUFBMUIsQ0FBOUI7QUFDRDs7QUFFRCxTQUFTQyxXQUFULEdBQXVCO0FBQ3JCLHFCQUFpQkwsS0FBS0MsR0FBTCxFQUFqQixTQUErQkMsS0FBS0MsSUFBTCxDQUFVRCxLQUFLRSxNQUFMLEtBQWdCLE1B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cEIsRUFBOEI7QUFDNUIsU0FBTyxVQUFDNUMsR0FBRCxFQUF1QjtBQUFBLFFBQWpCcUIsT0FBaUIsdUVBQVAsRUFBTzs7QUFDNUIsUUFBTUMsVUFBVXNCLFlBQVlBLFNBQVNKLE9BQXJCLElBQWdDSyxLQUFLTCxPQUFyRDs7QUFFQSxXQUFPcEIsbUJBQW1CcEIsR0FBbkIsRUFBd0JxQixPQUF4QixFQUFpQ0MsT0FBakMsQ0FBUDtBQUNELEdBSkQ7QUFLRDs7a0JBRWNxQixVIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRDYWxsYmFja0lkKCkge1xuICByZXR1cm4gYGpzb25wXyR7RGF0ZS5ub3coKX1fJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDAwMCl9YDtcbn1cblxuZnVuY3Rpb24gZ2V0U2NyaXB0SWQoKSB7XG4gIHJldHVybiBgc2NyaXB0XyR7RGF0ZS5ub3coKX1fJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDAwMCl9YDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2NyaXB0KHVybCwgaWQpIHtcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICBzY3JpcHQuaWQgPSBpZDtcbiAgc2NyaXB0LnNyYyA9IHVybDtcblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVTY3JpcHQoaWQpIHtcbiAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBjb25zdCBwYXJlbnQgPSBzY3JpcHQucGFyZW50Tm9kZTtcblxuICB0cnkge1xuICAgIHBhcmVudCAmJiBwYXJlbnQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGlnbm9yZVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNhbGxiYWNrKGlkKSB7XG4gIGRlbGV0ZSB3aW5kb3dbaWRdO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoc2NyaXB0KSB7XG4gIGNvbnN0IGZpcnN0U2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICBmaXJzdFNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGZpcnN0U2NyaXB0KTtcbn0gXG5cbmZ1bmN0aW9uIGZldGNoSnNvbnBJbnRlcm5hbCh1cmwsIG9wdGlvbnMsIHByb21pc2UpIHsgIFxuICByZXR1cm4gbmV3IHByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgNTAwMDtcbiAgICBjb25zdCBwYXJhbSA9IG9wdGlvbnMuanNvbnAgfHwgJ2NhbGxiYWNrJztcbiAgICBjb25zdCBjYWxsYmFja0lkID0gZ2V0Q2FsbGJhY2tJZCgpO1xuICAgIGNvbnN0IHNjcmlwdFVybCA9IFt1cmwsICh1cmwuaW5kZXhPZignPycpID09PSAtMSkgPyAnPycgOiAnJicsIHBhcmFtLCAnPScsIGNhbGxiYWNrSWRdLmpvaW4oJycpO1xuICAgIGNvbnN0IHNjcmlwdElkID0gZ2V0U2NyaXB0SWQoKTtcbiAgICBjb25zdCBzY3JpcHQgPSBjcmVhdGVTY3JpcHQoc2NyaXB0VXJsLCBzY3JpcHRJZCk7XG4gICAgXG4gICAgY29uc3QgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZWplY3QobmV3IEVycm9yKGBKU09OUCByZXF1ZXN0IHRvICR7dXJsfSB0aW1lZCBvdXRgKSk7XG4gICAgICBcbiAgICAgIHJlbW92ZUNhbGxiYWNrKGNhbGxiYWNrSWQpO1xuICAgICAgcmVtb3ZlU2NyaXB0KHNjcmlwdElkKTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIGNvbnN0IGRpc2FibGVUaW1lb3V0ID0gdGltZW91dElkID0+IGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuXG4gICAgd2luZG93W2NhbGxiYWNrSWRdID0gcmVzcG9uc2UgPT4ge1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIG9rOiB0cnVlLFxuICAgICAgICBqc29uOiAoKSA9PiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXG4gICAgICB9KTtcblxuICAgICAgZGlzYWJsZVRpbWVvdXQodGltZW91dElkKTtcbiAgICAgIHJlbW92ZUNhbGxiYWNrKGNhbGxiYWNrSWQpO1xuICAgICAgcmVtb3ZlU2NyaXB0KHNjcmlwdElkKTtcbiAgICB9O1xuXG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihgSlNPTlAgcmVxdWVzdCB0byAke3VybH0gZmFpbGVkICR7ZX1gKSk7XG5cbiAgICAgIGRpc2FibGVUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICByZW1vdmVDYWxsYmFjayhjYWxsYmFja0lkKTtcbiAgICAgIHJlbW92ZVNjcmlwdChzY3JpcHRJZCk7XG4gICAgfSk7XG5cbiAgICBhcHBlbmRTY3JpcHQoc2NyaXB0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZldGNoSnNvbnAoc2V0dGluZ3MpIHtcbiAgcmV0dXJuICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHByb21pc2UgPSBzZXR0aW5ncyAmJiBzZXR0aW5ncy5Qcm9taXNlIHx8IHNlbGYuUHJvbWlzZTtcblxuICAgIHJldHVybiBmZXRjaEpzb25wSW50ZXJuYWwodXJsLCBvcHRpb25zLCBwcm9taXNlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmV0Y2hKc29ucDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9mZXRjaC1qc29ucC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ])
});
;