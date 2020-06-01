export class Api {
  constructor({ url, token }) {
    this._url = url;
    this._headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  async getIndex() {
    const res = await fetch(`${this._url}/index`, {
      headers: this._headers,
    });

    const json = await res.json();
    return json;
  }

  async getTrack(path) {
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
