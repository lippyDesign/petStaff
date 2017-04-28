import gql from 'graphql-tag';

export default gql`
    mutation EditShippingAndReturns($heading:String, $content:String) {
        editShippingAndReturnsPage(heading:$heading, content:$content) {
            id,
            heading,
            content
        }
    }
`;