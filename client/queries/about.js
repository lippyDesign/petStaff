import gql from 'graphql-tag';

export default gql`
    {
        about {
            id
            heading
            content
        }
    }
`;