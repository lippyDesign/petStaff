import React, { Component } from 'react';

import FormReview from './FormReview';

export default class extends Component {
    renderRatingAndCount() {
        const { reviews } = this.props;
        if (reviews.length) {

            return
        }
        return 
    }
    renderReviews() {
        this.props.reviews.map(review => <li key={'key'}>{review}</li>)
    }
    render() {
        /*if(this.props.reviews.length) return <ul>{this.renderReviews()}</ul>
        return <section className="productReviews">
            <p>No reviews yet</p>*/
        return <section className="reviewSection">
            <ul className="collection with-header">
                <li className="collection-item reviewHeader"><i className="material-icons reviewHeaderStar">star_rate</i><i className="material-icons reviewHeaderStar">star_rate</i><i className="material-icons reviewHeaderStar">star_rate</i><i className="material-icons reviewHeaderStar">star_rate</i><i className="material-icons reviewHeaderStar">star_rate</i> <span className="reviewCount">50 reviews </span></li>
                <li className="collection-item">
                    <FormReview />
                </li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
            </ul>
        </section>
    }
}
