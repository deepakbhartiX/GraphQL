//Error Handlers - note: only use with expres routes graphql handle their own error internally so it don't use any expresss error handler middleware

// const {asynchandler} = require('../error_handling/async_handler')

// const {AppError} = require('../error_handling/custom_error')

// const {errorHandler} = require('../error_handling/global_error')

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
      const {data} = await axios.get("https://dummyjson.com/products");
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


//Testing Async Function



//Note always rememeber to use return value form functino beacause await async and promisse does't return anything own it own


//gettting data using promissi return by axios by defult

// const test3 = () =>{ return(axios.get("https://dummyjson.com/products").then(res=>res.data.products))}


// test3().then(console.log)


//gettting data async data using async function 
// const test = async() =>{const {data} = await axios.get("https://dummyjson.com/products") 
// return data
// }

// (async function result(){
//   const result = await test()
//     console.log(result);
// })()


//getting async data using callback function

// const test2 = async(laamo) =>{ await axios.get("https://dummyjson.com/products").then(res=>laamo(res))}

  // test2(lol=>{
  //   console.log(lol);
  // }) 



// const test3 = async() =>{return (await axios.get("https://dummyjson.com/products")).data}



