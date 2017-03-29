import gql from 'graphql-tag';

export default gql`
    mutation DeleteProduct($id: ID) {
        deleteProduct(id: $id) {
            id
        }
    }
`;