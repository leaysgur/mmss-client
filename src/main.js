import { bootstrap } from "./bootstrap.js";
import { Api } from "./api.js";

const apiUrl = import.meta.env.MODE !== "development" ? "/api" : "http://localhost:8080";

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
