<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { fly, scale } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

  const dispatch = createEventDispatcher()
  let visible = false

  onMount(() => visible = true)
</script>

<style>
  p {
    font-size: 5em;
    font-weight: bold;
    color: #bb0a1e;
    font-family: fantasy;
    margin: 0;
  }

  section {
    display: grid;
    justify-items: center;

  }
</style>

{#if visible}
<section on:click={() => dispatch('next')}>
  <p in:fly={{ y: 200, duration: 1000 }} style="font-size: 5em;">Github</p>
  <p in:fly={{ y: 200, duration: 1000, delay: 1000 }} style="font-size: 6em;">Repository</p>
  <p in:scale={{duration: 1000, delay: 1800, easing: quintOut}} style="font-size: 10em;">Deathmatch</p>
  <p in:scale={{duration: 500, delay: 4000, easing: quintOut}} style="font-size: 1em;">Click to Continue</p>
</section>
{/if}
