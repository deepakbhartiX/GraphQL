import { useState } from 'react'
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import './App.css'

const GET_PRODUCTS = gql`
  query GetProduct {
   products {
    id
    title
    user {
      firstName
      lastName
      
    }
   
  }
  }
`;


function App() {
  
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  console.log(data)

  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <>
    
     <h1>List of Products And User</h1>
     
      {/* <div><h1>heelo alalo{JSON.stringify(data)}</h1></div> */}
      <table>
        <tbody>
          {data.products.map(data=><tr>
            <td>{data.id}</td>
            <td>{data.title}</td>
            <td>{data.user.firstName}</td>
            <td>{data.user.lastName}</td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default App
