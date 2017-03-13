// @flow
export function getJSON(url: string, param?: Object): Promise<any> {
  if (param) {
    url += `?${_paramToQs(param)}`;
  }
  return fetch(url, { credentials: 'same-origin' })
    .then(res => res.json());
}

export function postJSON(url: string, param?: Object): Promise<any> {
  const options: RequestOptions = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  if (param) {
    options.body = JSON.stringify(param);
  }

  return fetch(url, options)
    .then(res => res.json());
}

let _mediaXhr: XMLHttpRequest;
export function getMediaSerial(url: string, param?: Object): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // 音源は重いので、常にシングルリクエストに
    if (_mediaXhr) {
      if (_mediaXhr.readyState !== 4) {
        _mediaXhr.abort();
      }
    } else {
      _mediaXhr = new XMLHttpRequest();
    }

    if (param) {
      url += `?${_paramToQs(param)}`;
    }

    _mediaXhr.open('GET', url);
    _mediaXhr.responseType = 'blob';

    _mediaXhr.onload = () => {
      resolve(_mediaXhr.response);
    };
    _mediaXhr.onerror = err => {
      reject(err);
    };

    _mediaXhr.send();
  });
}

function _paramToQs(param: { [string]: string; }): string {
  let ret: string[] = [];
  Object.entries(param).forEach(kv => {
    const key = kv[0];
    const val = kv[1];
    if (typeof val === 'string') {
      ret.push(`${key}=${encodeURIComponent(val)}`);
    }
  });
  return ret.join('&');
}
