import gql from 'graphql-tag';

export default gql`
    mutation EditPolicy($heading:String, $content:String) {
        editPolicyPage(heading:$heading, content:$content) {
            id,
            heading,
            content
        }
    }
`;