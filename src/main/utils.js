export const formatTime = (sec) => {
  const seconds = parseInt(sec, 10);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds / 60) % 60;
  const s = Math.floor(seconds) % 60;

  const mm = `0${m}`.slice(-2);
  const ss = `0${s}`.slice(-2);

  let ret = `${mm}:${ss}`;
  if (h > 0) {
    ret = `${h}:${ret}`;
  }

  return ret;
};
