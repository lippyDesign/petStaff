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
        return this.props.reviews.map(review => <li key={'key'}>{review}</li>)
    }
    renderRating() {
        const { reviews } = this.props;
        const count = reviews.length;
        if (!count) {
            return <span><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i><span className="reviewCount">{`${count} reviews`}</span></span>
        }
        let ratingSum = reviews.reduce((prev, curr) => {
            return prev + curr.rating;
        }, 0);
        ratingSum = ratingSum / count;
        const stars = []
        while (ratingSum >= 1) {
            stars.push(<i key={ratingSum} className="material-icons reviewHeaderStar">star_rate</i>);
            ratingSum--;
        }
        if (ratingSum >= 0.5) {
            stars.push(<i key={ratingSum} className="material-icons">star_half</i>);
        }
        stars.push(<span className="reviewCount" key={`${count}reviews`}>{`${count} reviews`}</span>)
        return <span>{stars}</span>
    }
    render() {
        /*if(this.props.reviews.length) return <ul>{this.renderReviews()}</ul>
        return <section className="productReviews">
            <p>No reviews yet</p>*/
        return <section className="reviewSection">
            <ul className="collection with-header">
                <li className="collection-item reviewHeader">{this.renderRating()}</li>
                <li className="collection-item">
                    <FormReview id={this.props.id} />
                </li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
                <li className="collection-item"><span className="title">Title</span><p>First Line</p></li>
            </ul>
        </section>
    }
}
