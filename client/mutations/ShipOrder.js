import gql from 'graphql-tag';

export default gql`
    mutation UpdateOrderShipped($id:ID, $shippedOn:String) {
        updateOrderShipped(id:$id, shippedOn:$shippedOn) {
            id
        }
    }
`;