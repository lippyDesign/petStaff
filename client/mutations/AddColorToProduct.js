import gql from 'graphql-tag';

export default gql`
    mutation AddColorToProduct($color: String, $productId: ID){
        addColorToProduct(color: $color, productId: $productId) {
            id
            colors {
                id
                value
            }
        }
    }
`;