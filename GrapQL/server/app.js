const express = require("express")

const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")

const typeDefs = require("./schema/schema")
const resolvers = require("./resolver/resolver")

const mongoDataMethods = require("../server/data/db")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://trang452k:trang452k@graphql.nbkk2.mongodb.net/?retryWrites=true&w=majority', {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log("MongoDB connected")
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
const server = new ApolloServer(
    {
        typeDefs, resolvers, context: () => ({ mongoDataMethods })
    }
)
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}
startServer();

// server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})