/* eslint-env node */
module.exports = {
  mount: {
    public: "/",
    src: '/_dist_',
  },
  devOptions: {
    port: 3000,
  },
  plugins: [
    "@snowpack/plugin-svelte",
  ],
};
