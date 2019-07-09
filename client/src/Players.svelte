<script>
  import { getContext, onMount, createEventDispatcher } from 'svelte'
  import { gql } from 'apollo-boost'

  const dispatch = createEventDispatcher()
  const apollo = getContext('apollo')

  let players = []
  let count = 1

  const GET_PLAYERS = gql`
    query {
      getPlayers {
        id
        avatarUrl
        description
        hitPoints
      }
    }
  `

  const select = (player) => {
    console.log(`Player ${count}`, player)
    dispatch('select', player)
    count++
  }

  onMount(async () => {
    const {data} = await apollo.query({ query: GET_PLAYERS })
    players = data.getPlayers
    console.log(players)
  })
</script>

<style>
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 140px);
    grid-gap: 1em;
    margin: 0;
  }

  p {
    text-align: center;
    font-weight: bold;
  }

  img {
    width: 100%;
  }

  section {
    display: grid;
    justify-items: center;
    align-items: center;
  }

</style>

<section>
<header>
  <h2>Select Player #{count}</h2>
</header>

<ul>
	{#each players as player}
		<li class="card" on:click={() => select(player)}>
      <img src={player.avatarUrl} alt={player.id} />
      <p>{player.id}</p>
		</li>
	{/each}
</ul>
</section>

