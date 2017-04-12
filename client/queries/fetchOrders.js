import gql from 'graphql-tag';

export default gql`
    {
        orders {
            id
            shippedOn
        }
    }
`;