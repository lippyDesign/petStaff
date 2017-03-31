import React, { Component } from 'react';
import Carousel from './Carousel';

export default class extends Component {
    render() {
        return <section className="productImages">
            <Carousel photos={this.props.photos} showFullscreenButton />
        </section>;
    }
}
