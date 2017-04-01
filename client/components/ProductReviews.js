import React, { Component } from 'react';

export default class extends Component {
    renderReviews() {
        this.props.reviews.map(review => <li key={'key'}>{review}</li>)
    }
    render() {
        if(this.props.reviews.length) return <ul>{this.renderReviews()}</ul>
        return <section className="productReviews">
            <p>No reviews yet</p>
        </section>;
    }
}
