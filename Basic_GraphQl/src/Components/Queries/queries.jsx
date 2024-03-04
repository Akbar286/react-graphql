import { gql } from "@apollo/client";


const get_User = gql`
  query {
    characters (filter: { gender: "Male" }) {
      results {
        id
        name
        gender
        image
      }
    }
  }
`;

console.log("get_users",get_User)

export default get_User;