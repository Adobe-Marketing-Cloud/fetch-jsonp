import fetchScript from 'fetch-script';

function getCallbackId(date, random) {
  return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}

function getResponseVarId(date, random) {
  return `jsonp_response_${date}_${random}`;
}

function cleanup(callbackId, responsVarId) {
  delete window[callbackId];
  delete window[responsVarId];
}

function fetchJsonpInternal(fetch, url, options) {
  const date = Date.now();
  const random = Math.ceil(Math.random() * 100000);
  const param = options.jsonp || 'callback';
  const callbackId = getCallbackId(date, random);
  const responsVarId = getResponseVarId(date, random);
  const jsonpUrl = [url, (url.indexOf('?') === -1) ? '?' : '&', param, '=', callbackId].join('');

  window[callbackId] = response => window[responsVarId] = response;

  return fetch(jsonpUrl, options)
  .then(() => {
    const response = window[responsVarId];

    cleanup(callbackId, responsVarId);

    return {
      ok: true,
      json: () => Promise.resolve(response)
    };
  })
  .catch(err => {
    cleanup(callbackId, responsVarId);

    return Promise.reject(new Error(`JSONP request to ${url} failed ${err}`));
  });
}

function fetchJsonp(settings) {
  return (url, options = {}) => {
    const Promise = settings && settings.Promise || self.Promise;
    const fetch = fetchScript({Promise});

    return fetchJsonpInternal(fetch, url, options);
  };
}

export default fetchJsonp;
