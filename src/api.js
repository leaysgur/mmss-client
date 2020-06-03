export class Api {
  constructor(url) {
    this._url = url;
    this._headers = null;
  }

  setToken(token) {
    this._headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  async getIndex() {
    if (!this._headers) throw new Error("Auth token has not set!");

    const res = await fetch(`${this._url}/index`, {
      headers: this._headers,
    });

    const json = await res.json();
    return json;
  }

  async getTrack(path) {
    if (!this._headers) throw new Error("Auth token has not set!");

    const params = new URLSearchParams();
    params.set("path", path);

    const res = await fetch(`${this._url}/track?${params.toString()}`, {
      headers: this._headers,
    });

    if (res.status === 200) {
      const blob = await res.blob();
      return blob;
    }

    const json = await res.json();
    return json;
  }
}
