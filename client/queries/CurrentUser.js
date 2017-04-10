import gql from 'graphql-tag';

export default gql`
    {
        user {
            id
            email
            shippingFirst
            shippingLast
            shippingEmail
            shippingPhone
            shippingStreet
            shippingCity
            shippingState
            shippingZip
            billingFirst
            billingLast
            billingEmail
            billingPhone
            billingStreet
            billingCity
            billingState
            billingZip
            cardNumber
            cardExpiration
            cvv
            orders {
                id
                dateAndTime
            }
        }
    }
`;
