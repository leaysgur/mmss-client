import { createStore as createUiStore } from "./ui.js";
import { createStore as createMediaStore } from "./media.js";

export const createStore = () => ({
  ...createUiStore(),
  ...createMediaStore(),
});
