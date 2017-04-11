import gql from 'graphql-tag';

export default gql`
    mutation AddItemToOrder($orderId:ID, $color:String, $size: String, $title: String, $quantity: Int, $productId: ID) {
        addItemToOrder(orderId:$orderId, color:$color, size:$size, title:$title, quantity:$quantity, productId:$productId) {
            id
        }
    }
`;