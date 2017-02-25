// @flow
export function getJSON(url: string, param?: Object): Promise<JSON> {
  if (param) {
    url += `?${_paramToQs(param)}`;
  }
  return fetch(url, { credentials: 'same-origin' })
    .then(res => res.json());
}

export function postJSON(url: string, param?: Object): Promise<JSON> {
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

function _paramToQs(param: Object): string {
  return Object.entries(param).reduce((cur, acc) => {
    cur.push(acc.join('='));
    return cur;
  }, []).join('&');
}
