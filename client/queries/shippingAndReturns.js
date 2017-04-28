import gql from 'graphql-tag';

export default gql`
    {
        shippingAndReturns {
            id
            heading
            content
        }
    }
`;