import gql from 'graphql-tag';

export default gql`
    mutation EditProduct(
        $id:ID,
        $title: String,
        $description: String,
        $assortment: String,
        $price: String,
        $priceSale: String,
        $shipping: String,
        $dateModified: String,
        $statOne: String,
        $statTwo: String,
        $statThree: String,
        $statFour: String,
        $statFive: String,
        $statSix: String
        $imageMain: String,
        $imageTwo: String,
        $imageThree: String,
        $imageFour: String,
        $imageFive: String,
        $imageSix: String
            ) {
        editProduct(
            id: $id,
            title: $title,
            description: $description,
            assortment: $assortment,
            price:$price,
            priceSale: $priceSale,
            shipping: $shipping,
            dateModified: $dateModified,
            statOne: $statOne,
            statTwo: $statTwo,
            statThree: $statThree,
            statFour: $statFour,
            statFive: $statFive,
            statSix: $statSix,
            imageMain: $imageMain,
            imageTwo: $imageTwo,
            imageThree: $imageThree,
            imageFour: $imageFour,
            imageFive: $imageFive,
            imageSix: $imageSix
        ) {
            id
            title
            description
        }
    }
`;