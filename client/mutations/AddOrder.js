import gql from 'graphql-tag';

export default gql`
    mutation AddOrder($shippingName:String, $shippingAddress:String, $shippingPhone:String, $shippingEmail:String $billingName:String, $billingAddress:String, $billingPhone:String, $billingEmail:String, $cardNumber:String, $cardExpiration:String, $cardCvv: String, $dateAndTime:String, $shippedOn:String) {
        addOrder(shippingName:$shippingName, shippingAddress:$shippingAddress, shippingPhone:$shippingPhone, shippingEmail:$shippingEmail, billingName:$billingName, billingAddress:$billingAddress, billingPhone:$billingPhone, billingEmail:$billingEmail, cardNumber:$cardNumber, cardExpiration:$cardExpiration, cardCvv:$cardCvv, dateAndTime:$dateAndTime, shippedOn:$shippedOn) {
            id
        }
    }
`;