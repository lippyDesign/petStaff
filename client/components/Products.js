import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import Card from './Card';
import SearchForm from './SearchForm';

import query from '../queries/fetchProducts';

class Products extends Component {
    renderSearchBox() {
        return <SearchForm />
    }
    renderProducts() {
        return this.props.data.products.map(({ title, photos, price, priceSale, colors, sizes, reviews, id }) => {
            return (
                <Card
                    title={title}
                    photos={photos}
                    price={price}
                    priceSale={priceSale}
                    colors={colors}
                    sizes={sizes}
                    reviews={reviews}
                    key={id}
                    id={id}
                    addToCart={this.props.addToCart}
                />
            );
        });
    }
    render() {
        if (!this.props.data.products) {
            return <div className="standardFlex paddingTopBottomFifty">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                        <div className="circle"></div>
                        </div><div className="gap-patch">
                        <div className="circle"></div>
                        </div><div className="circle-clipper right">
                        <div className="circle"></div>
                        </div>
                    </div>
                </div>
                <p>Loading Products</p>
            </div>
        }
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

export default graphql(query)(Products);