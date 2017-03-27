import gql from 'graphql-tag';

export default gql`
    mutation AddPhotoToProduct($photo: String, $productId: ID){
        addPhotoToProduct(photo: $photo, productId: $productId) {
            id
            photos {
                id
                url
            }
        }
    }
`;