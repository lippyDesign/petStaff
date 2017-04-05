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
    renderStatsAndDescription() {
        const { statOne, statTwo, statThree, statFour, statFive, statSix, description } = this.props.data.product;
        if ([statOne, statTwo, statThree, statFour, statFive, statSix].some(i => i)) {
            return <div className="row">
                <div className="col s12 l4"><ProductStats stats={[statOne, statTwo, statThree, statFour, statFive, statSix]} /></div>
                <div className="col s12 l8">
                    <ProductDescription description={description} />
                </div>
            </div>
        }
        return <div className="row">
                <div className="col s12">
                    <ProductDescription description={description} />
                </div>
            </div>
    }
    render() {
        if (!this.props.data.product) return <div />
        const { photos, priceSale, price, reviews, sizes, colors, title, description, id, shipping } = this.props.data.product;
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
                    <ProductBuy priceSale={priceSale} price={price} reviews={reviews} sizes={sizes} colors={colors} title={title} id={id} shipping={shipping} photos={photos} addToCart={this.props.addToCart} />
                </div>
            </div>
            <div className="divider"></div>
            {this.renderStatsAndDescription()}
            <div className="row">
                <div className="col s12">
                    <ProductReviews reviews={reviews} id={id} />
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
