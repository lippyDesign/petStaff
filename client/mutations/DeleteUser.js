import gql from 'graphql-tag';

export default gql`
    mutation DeleteUser($id:ID!){
        deleteUser(id:$id) {
            id
        }
    }
`;