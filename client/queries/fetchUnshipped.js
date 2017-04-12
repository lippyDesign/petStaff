import gql from 'graphql-tag';

export default gql`
    {
        unshippedOrders {
            id
            shippedOn
        }
    }
`;