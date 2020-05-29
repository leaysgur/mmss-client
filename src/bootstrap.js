import { storageTokenKey } from "./constants";
import SettingsApp from "./settings/App.svelte";
import SearchApp from "./search/App.svelte";
import PlayerApp from "./player/App.svelte";

export const bootstrap = async ({ location, localStorage, Api }) => {
  const params = new URLSearchParams(location.search.slice(1));
  const mode = params.get("mode") || "player";
  const token = localStorage.getItem(storageTokenKey) || "";

  // If settings specified, just navigate
  if (mode === "settings")
    return {
      App: SettingsApp,
      props: { reason: "Navigated to settings", token },
    };

  // Else valid token required and JSON must be fetched
  if (!token)
    return { App: SettingsApp, props: { reason: "Token not found", token } };

  const api = new Api({ url: "http://localhost:8080", token });

  try {
    const json = await api.getIndex();

    if (json.error)
      return { App: SettingsApp, props: { reason: json.error, token } };

    // If search specified
    if (mode === "search") return { App: SearchApp, props: { json } };

    // Else navigate to player
    return { App: PlayerApp, props: { json, api } };
  } catch (err) {
    return {
      App: SettingsApp,
      props: { reason: err.message, token },
    };
  }
};
