import { bootstrap } from "./bootstrap";

(async () => {
  const { App, props } = await bootstrap({
    location: window.location,
    localStorage: window.localStorage,
  });

  const $root = document.getElementById("root");
  // Svelte keeps original DOM
  $root.innerHTML = "";

  new App({ target: $root, props });
})();
