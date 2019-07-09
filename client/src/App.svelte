<script>
	import { setContext } from 'svelte'
	import Title from './Title.svelte'
	import Players from './Players.svelte'
	import Deathmatch from './Deathmatch.svelte'
	import ApolloClient from 'apollo-boost'

	let page = "Title"
	let player1 = null
	let player2 = null
	
	setContext('apollo', new ApolloClient({ uri: 'http://localhost:4000' }))

	const selectPlayer = evt => {
		const player = evt.detail

		if (!player1){
			player1 = player
		} else if (!player2) {
			player2 = player
			page = "Fight"
		}
	}

	const reset = () => {
		player1 = null
		player2 = null
		page = 'Players'
	}
</script>

{#if page === 'Title'}
	<Title on:next={() => page = "Players"}/>
{:else if page === 'Players'}
	<Players on:select={selectPlayer} />
{:else if page === 'Fight'}
	<Deathmatch player1={player1} player2={player2} on:next={reset} />
{/if}

