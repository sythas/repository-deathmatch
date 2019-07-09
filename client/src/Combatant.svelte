<script>
  import Health from './Health.svelte'
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte'

  export let player
  export let direction
</script>

<style>
  img {
    width: 240px;
    height: 240px;
    transition: all 0.25s ease-out;
  }

  .right {
    transform: translateX(40vw);
  }

  .left {
    transform: translateX(-40vw);
  }

  div {
    height: 620px;
    margin: 2rem 2rem 0 2rem;
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: center;
    align-items: end;
  }
</style>

<div>
  <Health maxHP={player.hitPoints} currentHP={player.currentHP} />
  {#if player.currentHP > 0}
    <img class={direction} src={player.avatarUrl} alt={player.id} out:slide />
  {/if}
</div>
