import React, { Component } from 'react';

import HomeMain from './HomeMain';
import ProductSuggested from './ProductSuggested';
import WhyUs from './WhyUs';
import SearchForm from './SearchForm';

class Home extends Component {
    renderSearchBox() {
        return <SearchForm searchText={this.props.searchText} updateSearchText={this.props.updateSearchText} />
    }
    render() {
        return <section className="home">
            <div className="container">
                {this.renderSearchBox()}
            </div>
            <HomeMain />
            <ProductSuggested addToCart={this.props.addToCart} />
            <WhyUs/>
        </section>
    }
}

export default Home;