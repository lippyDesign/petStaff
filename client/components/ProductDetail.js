import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import ProductImages from './ProductImages';
import ProductBuy from './ProductBuy';
import ProductDescription from './ProductDescription';
import ProductStats from './ProductStats';
import ProductReviews from './ProductReviews';
import ProductRelated from './ProductRelated';
import SearchForm from './SearchForm';

import fetchProduct from '../queries/fetchProduct';

class ProductDetail extends Component {
    render() {
        console.log(this.props.data)
        if (!this.props.data.product) return <div />
        const { photos, priceSale, price, reviews, sizes, colors, title } = this.props.data.product;
        return <section className="productDetail container">
            <div className="row productDetailTop">
                <div className="col s12 l2 backButtonContainer">
                    <Link to='/products' className="backButton left"><i className="material-icons backArrow">keyboard_arrow_left</i> Products</Link>
                </div>
                <div className="col s12 l8">
                    <SearchForm />
                </div>
            </div>
            <div className="row">
                <div className="col s12 l8">
                    <ProductImages photos={photos}/>
                </div>
                <div className="col s12 l4">
                    <ProductBuy priceSale={priceSale} price={price} reviews={reviews} sizes={sizes} colors={colors} title={title} />
                </div>
            </div>
            <div className="row">
                <div className="col s12 l4">
                    <ProductStats />
                </div>
                <div className="col s12 l8">
                    <ProductDescription />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <ProductReviews />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <ProductRelated />
                </div>
            </div>
        </section>;
    }
}

export default graphql(fetchProduct, {
    options: props => { return { variables: { id: props.params.id } } }
})(ProductDetail);
