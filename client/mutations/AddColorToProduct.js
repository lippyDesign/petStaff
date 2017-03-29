import gql from 'graphql-tag';

export default gql`
    mutation AddColorToProduct($productId: ID, $color: String){
        addColorToProduct(productId: $productId, color: $color) {
            id
            colors {
            id
            }
        }
    }
`;