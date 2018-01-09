export async function getJSON(url: string, param?: {}): Promise<{}> {
  if (param) {
    url += `?${_paramToQs(param)}`;
  }
  const res = await fetch(url, { credentials: 'same-origin' });
  const json = await res.json();
  return json;
}

export async function postJSON(url: string, param?: {}): Promise<{}> {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: param ? JSON.stringify(param) : {},
  };

  const res = await fetch(url, options);
  const json = await res.json();
  return json;
}

let _mediaXhr: XMLHttpRequest;
export function getMediaSerial(url: string, param?: {}): Promise<{} | Error> {
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

function _paramToQs(param: {}): string {
  const ret: string[] = [];
  for (const kv of Object.entries(param)) {
    const [key, val] = kv;

    if (typeof val === 'string') {
      ret.push(`${key}=${encodeURIComponent(val)}`);
    }
  }
  return ret.join('&');
}
