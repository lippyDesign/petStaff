import gql from 'graphql-tag';

export default gql`
    mutation AddReviewToProduct($content:String, $rating: Int, $productId: ID){
        addReviewToProduct(productId: $productId, content: $content, rating: $rating) {
            id
            reviews {
                id
            }
        }
    }
`;