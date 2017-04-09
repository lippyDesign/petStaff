import React, { Component } from 'react';

import HomeMain from './HomeMain';
import ProductSuggested from './ProductSuggested';

class Home extends Component {
    render() {
        return <section className="home">
            <HomeMain />
            <ProductSuggested addToCart={this.props.addToCart} />
        </section>
    }
}

export default Home;