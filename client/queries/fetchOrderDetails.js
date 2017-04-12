import gql from 'graphql-tag';

export default gql`
    query Order($id:ID!){
        order(id:$id) {
            id
            shippingName
            shippingAddress
            shippingPhone
            shippingEmail
            billingName
            billingAddress
            billingPhone
            billingEmail
            cardNumber
            cardExpiration
            cardCvv
            dateAndTime
            shippedOn
            user {
            id
            email
            }
            orderItems {
            id
            color
            size
            title
            price
            priceSale
            shipping
            quantity
            }
        }
    }
`;