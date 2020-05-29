<script>
  import { storageTokenKey } from "../constants";

  export let reason;
  export let token;
  $: {
    // save token on update
    if (token.trim().length > 0) localStorage.setItem(storageTokenKey, token);
  }
</script>

<main>
  <h1>Settings</h1>
  <p>You are here because `{reason}`.</p>
  <label>
    Token:
    <input type="text" bind:value="{token}" />
  </label>
  <hr />
  <a href="/">player</a>
  |
  <a href="/?mode=search">search</a>
</main>

<style>

</style>
