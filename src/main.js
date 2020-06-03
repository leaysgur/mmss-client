import { bootstrap } from "./bootstrap.js";
import { Api } from "./api.js";

// eslint-disable-next-line
const apiUrl = __isProduction__ ? "/api" : "http://localhost:8080";

(async () => {
  const { App, props } = await bootstrap({
    location: window.location,
    localStorage: window.localStorage,
    api: new Api(apiUrl),
  });

  const $root = document.getElementById("root");
  // Svelte keeps original DOM
  $root.innerHTML = "";

  new App({ target: $root, props });
})();
