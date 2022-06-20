const express = require('express');
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')


const index = express()

let server = null
async function startServer() {
    server = new ApolloServer({
        typeDefs,
        resolvers
    })
    await server.start()
    server.applyMiddleware({ index })
}

startServer()

index.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})