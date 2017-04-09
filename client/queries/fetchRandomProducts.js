import gql from 'graphql-tag';

export default gql`
    {
        randomProducts {
            id
            title
            price
            priceSale
            shipping
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
            }
        }
    }
`;