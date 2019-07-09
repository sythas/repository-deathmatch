import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import getChallenger from './lib/github'

dotenv.config()

const typeDefs = readFileSync('./schema.graphql', 'UTF8')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    getChallenger
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
