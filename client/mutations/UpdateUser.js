import gql from 'graphql-tag';

export default gql`
        mutation UpdateUser(
            $id:ID,
            $shippingFirst: String,
            $shippingLast: String,
            $shippingEmail: String,
            $shippingPhone: String,
            $shippingStreet: String,
            $shippingCity: String,
            $shippingState: String,
            $shippingZip: String,
            $billingFirst: String,
            $billingLast: String,
            $billingEmail: String,
            $billingPhone: String,
            $billingStreet: String,
            $billingCity: String,
            $billingState: String,
            $billingZip: String,
            $cardNumber: String,
            $cardExpiration: String,
            $cvv: String
        ) {
        updateUser(
            id:$id,
            shippingFirst: $shippingFirst,
            shippingLast: $shippingLast,
            shippingEmail: $shippingEmail,
            shippingPhone: $shippingPhone,
            shippingStreet: $shippingStreet,
            shippingCity: $shippingCity,
            shippingState: $shippingState,
            shippingZip: $shippingZip,
            billingFirst: $billingFirst,
            billingLast: $billingLast,
            billingEmail: $billingEmail,
            billingPhone: $billingPhone,
            billingStreet: $billingStreet,
            billingCity: $billingCity,
            billingState: $billingState,
            billingZip: $billingZip,
            cardNumber: $cardNumber,
            cardExpiration: $cardExpiration,
            cvv: $cvv
        ) {
            id
        }
    }
`;