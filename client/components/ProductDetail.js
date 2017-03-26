import React, { Component } from 'react';
import { Link } from 'react-router';

import ProductImages from './ProductImages';
import ProductDescription from './ProductDescription';
import ProductStats from './ProductStats';
import Reviews from './Reviews';
import RelatedProducts from './RelatedProducts';

class ProductDetail extends Component {
    render() {
        return <section className="productDetail container">
            <div className="row">
                <Link to='/products' className="backButton"><i className="material-icons backArrow">keyboard_arrow_left</i> Back</Link>
            </div>
            <div className="col s12 l6">
                <ProductImages/>
            </div>
            <div className="col s12 l6">
                <ProductDescription />
                <ProductStats />
            </div>
            <Reviews />
            <RelatedProducts />
        </section>;
    }
}

export default ProductDetail;
