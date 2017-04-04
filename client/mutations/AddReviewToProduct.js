import gql from 'graphql-tag';

export default gql`
    mutation AddReviewToProduct($content:String, $rating: Int, $productId: ID, $userId: ID){
        addReviewToProduct(productId: $productId, content: $content, rating: $rating, userId: $userId) {
            id
            reviews {
                id
            }
        }
    }
`;