import {gql} from 'apollo-boost';

export const GET_USERS = gql`
query getAllUsers($first: Int, $offset: Int,  $orderBy:[UsersOrderBy!] ){
    allUsers(first: $first, offset: $offset, orderBy: $orderBy) {
        pageInfo {
            startCursor
            hasNextPage
            hasPreviousPage
        }
        nodes {
            id
            email
            name
            status
        }
  }
}
`;

export const ADD_USER = gql`
  mutation createUser($name: String!, $email: String!, $status: String!) {
     createUser(input: {user: {name:$name, email:$email, status:$status}}){
        user{
            id
            email
            name
            status
        }
      }
  }
`;
export const EDIT_USER = gql`
mutation EditUser($id: ID!,$name: String!, $email: String!, $status: String!) {
  updateUser(input: {id: $id, userPatch: {name:$name, email:$email, status:$status}}){
    user{
      id
      email
      name
      status
    }
  }
}

`;
export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(input: {id: $id}){
            user{
                id
            }
        }
    }
`;
