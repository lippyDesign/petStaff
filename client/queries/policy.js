import gql from 'graphql-tag';

export default gql`
    {
        policy {
            id
            heading
            content
        }
    }
`;