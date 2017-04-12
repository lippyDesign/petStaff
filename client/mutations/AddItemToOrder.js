import gql from 'graphql-tag';

export default gql`
    mutation AddItemToOrder($orderId:ID, $color:String, $size: String, $title: String, $price:String, $priceSale:String, $shipping:String, $quantity: Int, $productId: ID) {
        addItemToOrder(orderId:$orderId, color:$color, size:$size, title:$title, price:$price, priceSale:$priceSale, shipping:$shipping, quantity:$quantity, productId:$productId) {
            id
        }
    }
`;