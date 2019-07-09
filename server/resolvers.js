import random from 'lodash/random'
import uniqueId from 'lodash/uniqueId'

let scoreboard = {}

const resolvers = {
  Query: {
    getRecord: (parent, { id }) => scoreboard[id] || { wins: 0, losses: 0 },
    challenger: async (parent, { id }, { getChallenger }) => getChallenger(id),
    getPlayers: (parent, args, { getChallenger }) => Promise.all([
        getChallenger("facebook/react"), 
        getChallenger("angular/angular"), 
        getChallenger("vuejs/vue"), 
        getChallenger("sveltejs/svelte"), 
        getChallenger("emberjs/ember.js"),
        getChallenger("jquery/jquery"),
        getChallenger("twbs/bootstrap"),
        getChallenger("lodash/lodash")
      ])
  },

  Mutation: {
    fight: async (parent, { leftId, rightId }, { getChallenger }) => {
      if (!rightId)
        throw new Error("No right challenger.")

      if (!leftId)
        throw new Error("No left challenger.")

      const left = await getChallenger(leftId)
      const right = await getChallenger(rightId)

      if (!scoreboard[leftId])
        scoreboard[leftId] = { wins: 0, losses: 0 }

      if (!scoreboard[rightId])
        scoreboard[rightId] = { wins: 0, losses: 0 }

      const rounds = []
      while (left.damage < left.hitPoints && right.damage < right.hitPoints) {
        const round = [
          random(0, left.attack),
          random(0, right.attack)
        ]

        right.damage += round[0]
        left.damage += round[1]
        rounds.push(round)
      }

      let winner = left.damage > left.hitPoints && right.damage > right.hitPoints
        ? null
        : left.damage > left.hitPoints
          ? right
          : left;

      if (winner) {
        scoreboard[left.id][winner.id === left.id ? 'wins' : 'losses']++
        scoreboard[right.id][winner.id === right.id ? 'wins' : 'losses']++
      }

      return {
        id: uniqueId(),
        rounds,
        winner: winner.id,
        winnerAvatarUrl: winner.avatarUrl,
        right,
        left
      }
    }
  },
  Challenger: {
    record: ({ id }) => {
      return scoreboard[id] || { wins: 0, losses: 0 }
    }
  }
}

export default resolvers;
