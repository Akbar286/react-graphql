import { useState, useEffect } from "react";
import axios from "axios";


const UserList2 = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([])

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
        const response = await axios.post(
          "https://rickandmortyapi.com/graphql",
          {
            query
          }
        );
        
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
        
        console.log("response is",response)
        setData( response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      
    };
    fetchData();
  }, []);
  if (loading) return <h1>Loading.....</h1>;
  if (error) return <h1>Error: {error}</h1>;
  console.log('data is', data);

  return(
    <div>
    <h1>UserList2 using Axios</h1>
    <ul>
      {data.characters.results.map((result) => (
        <li key={result.id}>
          {result.name} -- -- <img src={result.image} alt={result.name} />
        </li>
      ))}
    </ul>
  </div>
  )};

export default UserList2;
             













// ... (import statements)

// const UserList2 = () => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState();
//     const [data, setData] = useState([]);
  
//     useEffect(() => {
//       const query = `
//           query {
//             characters {
//               results {
//                 id
//                 name
//                 gender
//                 image
//               }
//             }
//           }
//         `;
//       const fetchData = async () => {
//         try {
//           const response = await axios.post(
//             "https://rickandmortyapi.com/graphql",
//             {
//               query,
//             }
//           );
  
//           if (response.errors) {
//             throw new Error(response.errors[0].message);
//           }
  
//           setData(response.data.data); // No need for await here
//           setLoading(false);
//         } catch (error) {
//           setError(error.message);
//           setLoading(false);
//         }
//       };
//       fetchData();
//     }, []);
  
//     if (loading) return <h1>Loading.....</h1>;
//     if (error) return <h1>Error: {error}</h1>;
  
//     console.log('data is', data); // Move the console.log here
  
//     return (
//       <div>
//         <h1>UserList2 using Axios</h1>
//         <ul>
//           {data.characters.results.map((result) => (
//             <li key={result.id}>
//               {result.name} -- -- <img src={result.image} alt={result.name} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
//   export default UserList2;
  