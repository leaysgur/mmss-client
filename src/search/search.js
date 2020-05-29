export const artistSearch = (json, keyword) => {
  if (keyword.length === 0) return null;

  let reg;
  try {
    reg = new RegExp(keyword, "i");
  } catch {
    return null;
  }

  let found = false;
  const ret = {};
  for (const artist of json) {
    if (reg.test(artist.name)) {
      ret[artist.name] = artist.albums.map((album) => album.name);
      found = true;
    }
  }

  if (!found) return null;

  return ret;
};
