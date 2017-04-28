import gql from 'graphql-tag';

export default gql`
    mutation EditAbout($heading:String, $content:String) {
        editAboutPage(heading:$heading, content:$content) {
            id,
            heading,
            content
        }
    }
`;