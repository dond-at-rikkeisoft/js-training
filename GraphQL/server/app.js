const express = require('express')
const {ApolloServer} = require ('apollo-server-express')

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const mongoose = require ("mongoose")

//Load db methods

const mongoDataMethods = require("./data/db")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://trang452k:trang452k@graphql.nbkk2.mongodb.net/?retryWrites=true&w=majority',{
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology : true,
            // useFindAndModify: false
        })
        console.log("MongoDB connected")
    }catch (error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express();

async function startserver(){
    server = new ApolloServer({
        typeDefs,
        resolvers,
        context : () => ({mongoDataMethods})
    })
    await server.start()
    server.applyMiddleware({app})
}

startserver()

app.listen({port:4000},()=>{
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})