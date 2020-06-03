import { storageTokenKey } from "./constants";
import SettingsApp from "./settings/app.svelte";
import SearchApp from "./search/app.svelte";
import MainApp from "./main/app.svelte";

export const bootstrap = async ({ location, localStorage, api }) => {
  const params = new URLSearchParams(location.search.slice(1));
  const mode = params.get("mode") || "player";
  const token = localStorage.getItem(storageTokenKey) || "";

  // If settings is specified, just navigate
  if (mode === "settings")
    return {
      App: SettingsApp,
      props: { reason: "Navigated to settings", token },
    };

  // Else valid token required and JSON must be fetched
  if (!token)
    return { App: SettingsApp, props: { reason: "Token not found", token } };

  api.setToken(token);
  try {
    const json = await api.getIndex();

    if (json.error)
      return { App: SettingsApp, props: { reason: json.error, token } };

    // If search is specified
    if (mode === "search") return { App: SearchApp, props: { json } };

    // Else navigate to player main
    return { App: MainApp, props: { json, api } };
  } catch (err) {
    return {
      App: SettingsApp,
      props: { reason: err.message, token },
    };
  }
};
