import { useQuery } from "@apollo/client";
import get_User from "../Queries/queries";

import React from 'react'

function UserList() {
  const {loading, error, data}  = useQuery(get_User)
  if (!data) return <p>No data available</p>;

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
    
console.log("helloo data" , data)
    return(
        <div>
      <h2>User List</h2>
      <ul>
        {data.characters.results.map(results => (
          <li key={results.id}>
            { results.name}   --  <img src={results.image} ></img>
          </li>
              
        ))}

        {/* {data.characters.results.map(results => (
          <li>
          <div>
          <img src={results.image} ></img>
          </div>
          </li>
        ))}   */}
      </ul>
      <img>
        {

        }
      </img>
    </div>
    )
  
}

export default UserList