import gql from 'graphql-tag';

export default gql`
    mutation UpdateSearchText($searchText:String) {
        updateSearchText(searchText:$searchText) {
            id
            title
        }
    }
`;