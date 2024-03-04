
import { useState, useEffect } from 'react'

//this code is fetching the data using fetch method, graphql and disply it 
function UserList1() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    const query = `
  query {
    characters {
      results {
        id
        name
        gender
        image
      }
    }
  }
`;
    const fetchData = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
          },
          body: JSON.stringify({
            query: query
          }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setUsers(result.data);
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h2>User List fetching the data using fetch method, graphql</h2>
      <ul>
        {users.characters.results.map(result => (
          <li key={result.id}>
            {result.name} - {result.image}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList1;












