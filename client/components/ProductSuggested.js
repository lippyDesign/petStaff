import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import Card from './Card';

import query from '../queries/fetchRandomProducts';

class ProductSuggested extends Component {
    renderSuggestedProducts() {
        return this.props.data.randomProducts.map(({ title, photos, price, priceSale, colors, sizes, reviews, id, shipping }) => {
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
                    shipping={shipping}
                />
            );
        });
    }
    render() {
        if (this.props.data.loading) return <div />
        return <section className="productSuggested">
            <h3 className="textCenter textWhite">You May Like</h3>
            <div className="productSuggestedList">
                {this.renderSuggestedProducts()}
            </div>
        </section>;
    }
}

export default graphql(query)(ProductSuggested);
