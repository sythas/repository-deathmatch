<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import Stage from './Stage.svelte'
  import Combatant from './Combatant.svelte'
  import Health from './Health.svelte'
  import { gql } from 'apollo-boost'

  const dispatch = createEventDispatcher()
  const apollo = getContext('apollo')
  
  const FIGHT = gql`
    mutation FIGHT($leftId: ID!, $rightId: ID!) {
      fight(leftId: $leftId, rightId: $rightId) {
        rounds
        winner
        winnerAvatarUrl
        right {
          id
          hitPoints
          damage
        }
        left {
          id
          hitPoints
          damage
        }
      }
    }
  `

  export let player1
  export let player2
  let data
  let player1Attack = ""
  let player2Attack = ""
  let done = false

  player1.currentHP = player1.hitPoints
  player2.currentHP = player2.hitPoints

  onMount(async () => {
    const { data: { fight } } = await apollo.mutate({ 
      mutation: FIGHT, 
      variables: { leftId: player1.id, rightId: player2.id }
    })

    let i = 0;
    const interval = setInterval(() => {
      const round = fight.rounds[i]
      if (!round){
        done = true
        clearInterval(interval)
        return
      }

      player1.currentHP = Math.max(player1.currentHP - round[1], 0)
      player2.currentHP = Math.max(player2.currentHP - round[0], 0)
      i++
      if (i % 4 === 0){
        player1Attack="right"
        player2Attack=""
      } else if (i % 4 === 2) {
        player1Attack=""
        player2Attack="left"
      } else {
        player1Attack=""
        player2Attack=""
      }
    }, 140)
  })
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<Stage background="./ryu.jpeg">
  <div slot="player1">
    <Combatant player={player1} direction={player1Attack} />
  </div>
  <div slot="player2">
    <Combatant player={player2} direction={player2Attack} />
  </div>
</Stage>

{#if done}
  <button on:click={() => dispatch('next')}>Another Fight?</button>
{/if}
