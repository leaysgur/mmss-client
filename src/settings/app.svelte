<script>
  import { storageTokenKey } from "../constants";

  export let reason;
  export let token;

  // Save token on update
  $: localStorage.setItem(storageTokenKey, token);
</script>

<main>
  <h1>Settings</h1>
  <p>You are here because `{reason}`.</p>
  <label>
    Token:
    <input type="text" bind:value={token} />
  </label>
  <hr />
  <a href="/">main</a>
  |
  <a href="/?mode=search">search</a>
</main>

<style>
  main {
    text-align: center;
  }
</style>
