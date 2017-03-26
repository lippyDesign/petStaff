import React, { Component } from 'react';

import Card from './Card';
import SearchForm from './SearchForm';

class Products extends Component {
    renderSearchBox() {
        return <SearchForm />
    }
    renderProducts() {
        return p.map(({ title, imageMain, price, priceSale, rating, id }) => {
            return (
                <Card
                    title={title}
                    imageMain={imageMain}
                    price={price}
                    priceSale={priceSale}
                    rating={rating}
                    key={id}
                    id={id}
                />
            );
        });
    }
    render() {
        return <section className="wrapper products">
            <div className="container">
                <div className="row">
                    {this.renderSearchBox()}
                </div>
            </div>
            <div className="productListMain">
                {this.renderProducts()}
            </div>
        </section>
    }
}

export default Products;

const p = [
    {
        id: '1',
        title: 'Product 1',
        Collection: 'Collection 1',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        stats: [],
        imageMain: 'http://placehold.it/500x370',
        images: [],
        price: 19.99,
        priceSale: null,
        rating: 5,
        reviews: [],
        sizes: [],
        colors: [],
        shipping: 0,
        dateAdded: 131435,
        addedBy: 'e2fge3ge3wg'
    },
    {
        id: '2',
        title: 'Product 2',
        Collection: 'Collection 3',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        stats: [],
        imageMain: 'http://placehold.it/500x370',
        images: [],
        price: 29.99,
        priceSale: null,
        rating: 4,
        reviews: [],
        sizes: [],
        colors: [],
        shipping: 1.99,
        dateAdded: 131435,
        addedBy: 'e2fge3ge3wg'
    },
    {
        id: '3',
        title: 'Product 3',
        Collection: 'Collection X',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        stats: [],
        imageMain: 'http://placehold.it/500x370',
        images: [],
        price: 17.99,
        priceSale: 9.99,
        rating: 4.5,
        reviews: [],
        sizes: [],
        colors: [],
        shipping: 2.99,
        dateAdded: 131435,
        addedBy: 'e2fge3ge3wg'
    },
    {
        id: '4',
        title: 'Product 4',
        Collection: 'Collection 1',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        stats: [],
        imageMain: 'http://placehold.it/500x370',
        images: [],
        price: 19.99,
        priceSale: null,
        rating: 5,
        reviews: [],
        sizes: [],
        colors: [],
        shipping: 0,
        dateAdded: 131435,
        addedBy: 'e2fge3ge3wg'
    },
    {
        id: '5',
        title: 'Product 5',
        Collection: 'Collection 3',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        stats: [],
        imageMain: 'http://placehold.it/500x370',
        images: [],
        price: 29.99,
        priceSale: null,
        rating: 4,
        reviews: [],
        sizes: [],
        colors: [],
        shipping: 1.99,
        dateAdded: 131435,
        addedBy: 'e2fge3ge3wg'
    },
    {
        id: '6',
        title: 'Product 6',
        Collection: 'Collection X',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        stats: [],
        imageMain: 'http://placehold.it/500x370',
        images: [],
        price: 17.99,
        priceSale: 9.99,
        rating: 4.5,
        reviews: [],
        sizes: [],
        colors: [],
        shipping: 2.99,
        dateAdded: 131435,
        addedBy: 'e2fge3ge3wg'
    }

]
