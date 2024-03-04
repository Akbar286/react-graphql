import { useQuery } from "@apollo/client";
import get_User from "../Queries/queries";


// fetching the data using apollo cliend and its methods
function UserList() {
  const {loading, error, data}  = useQuery(get_User)
  // if (!data) return <p>No data available............</p>;

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
 
    

    return(
        <div>
      <h2>User List using Apollo client </h2>
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
     
    </div>
    )
  }

export default UserList