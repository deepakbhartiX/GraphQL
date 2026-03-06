//Error Handlers
const {asynchandler} = require('../error_handling/async_handler')

const {AppError} = require('../error_handling/custom_error')

const {errorHandler} = require('../error_handling/global_error')

//modules


const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const axios = require('axios')
const app = express();

const typeDefs = `#graphql
  type Query {
    hello: String
    products:[Product]
  }

  type Product{
   id:ID
   title:String
  }
`;

const  resolvers = {
  Query: {
   products:
    async () => {
      const { data } = await axios.get("https://dummyjson.com/products");
      return data.products;
  }
  }
  
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
     resolvers,
     csrfPrevention: false
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });

  
}

startServer();



const test = async() =>(await axios.get("https://dummyjson.com/products")).data
   


// (async () => {
//   const data = await test();
//   console.log(data);
// })(); 

// async function fetchdata()  {
//   const res = await test()
//   console.log(res); 
// }

// fetchdata()  


console.log('eehlo');