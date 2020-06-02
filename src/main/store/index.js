import { createStore as createUiStore } from "./ui";
import { createStore as createMediaStore } from "./media";

export const createStore = () => ({
  ...createUiStore(),
  ...createMediaStore(),
});
