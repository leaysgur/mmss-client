import { bootstrap } from "./bootstrap";
import { Api } from "./api";

(async () => {
  const { App, props } = await bootstrap({
    location: window.location,
    localStorage: window.localStorage,
    Api,
  });

  const $root = document.getElementById("root");
  $root.innerHTML = "";

  const app = new App({ target: $root, props });
  // For debug
  window.app = app;
})();
