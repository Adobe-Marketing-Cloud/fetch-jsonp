function getCallbackId() {
  return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}

function getScriptId() {
  return `script_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
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
  const script = document.getElementById(id);
  const parent = script.parentNode;

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
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
} 

function fetchJsonpInternal(url, options, promise) {  
  return new promise((resolve, reject) => {
    const timeout = options.timeout || 5000;
    const param = options.jsonpCallback || 'callback';
    const callbackId = options.jsonpCallbackFunction || getCallbackId();
    const scriptUrl = [url, (url.indexOf('?') === -1) ? '?' : '&', param, '=', callbackId].join('');
    const scriptId = getScriptId();
    const script = createScript(scriptUrl, scriptId);
    
    const timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${url} timed out`));
      
      removeCallback(callbackId);
      removeScript(scriptId);
    }, timeout);

    const disableTimeout = timeoutId => clearTimeout(timeoutId);

    window[callbackId] = response => {
      resolve({
        ok: true,
        json: () => Promise.resolve(response)
      });

      disableTimeout(timeoutId);
      removeCallback(callbackId);
      removeScript(scriptId);
    };

    script.addEventListener('error', function(e) {
      reject(new Error(`JSONP request to ${url} failed ${e}`));

      disableTimeout(timeoutId);
      removeCallback(callbackId);
      removeScript(scriptId);
    });

    appendScript(script);
  });
}

function fetchJsonp(settings) {
  return (url, options = {}) => {
    const promise = settings && settings.Promise || self.Promise;

    return fetchJsonpInternal(url, options, promise);
  };
}

export default fetchJsonp;
