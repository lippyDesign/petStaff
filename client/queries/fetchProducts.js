import gql from 'graphql-tag';

export default gql`
    {
        products {
            id
            title
            price
            priceSale
            sizes {
                id
                value
            }
            colors {
                id
                value
            }
            photos {
                id
                url
            }
            reviews {
                id
                content
                rating
                user {
                    id
                }
            }
        }
    }
`;