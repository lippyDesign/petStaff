import gql from 'graphql-tag';

export default gql`
    query ProductQuery($id:ID!){
        product(id:$id){
            id
            title
            description
            assortment
            price
            priceSale
            shipping
            dateAdded
            statOne
            statTwo
            statThree
            statFour
            statFive
            statSix
            photos {
                id
                url
            }
            colors {
                id
                value
            }
            sizes {
                id
                value
            }
            reviews {
                id
                content
                rating
                user {
                    id
                    email
                }
            }
        }
    }
`;