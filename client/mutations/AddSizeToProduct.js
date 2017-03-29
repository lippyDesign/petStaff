import gql from 'graphql-tag';

export default gql`
    mutation AddSizeToProduct($productId: ID, $size: String){
        addSizeToProduct(productId: $productId, size: $size) {
            id
            sizes {
                id
            }
        }
    }
`;