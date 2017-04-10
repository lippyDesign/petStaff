import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/CurrentUser';

import FormReview from './FormReview';

class ProductReviews extends Component {
    renderRatingAndCount() {
        const { reviews } = this.props;
        if (reviews.length) {

            return
        }
        return 
    }
    renderReviews() {
        return this.props.reviews.map(({ id, content, rating, user }) => {
            const stars = this.renderStars(rating);
            return <li className="collection-item" key={id}><span className="title">{user ? user.email : 'unknown'} <span className="starsWrapper">{stars}</span></span><p>{content}</p></li>
        });
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
        const stars = this.renderStars(ratingSum);
        stars.push(<span className="reviewCount" key={`${count}reviews`}>{`${count} reviews`}</span>)
        return <span>{stars}</span>
    }
    renderStars(num) {
        const stars = []
        while (num >= 1) {
            stars.push(<i key={num} className="material-icons reviewHeaderStar">star_rate</i>);
            num--;
        }
        if (num >= 0.5) {
            stars.push(<i key={num} className="material-icons">star_half</i>);
        }
        return stars
    }
    renderFormOrMessage() {
        if (this.props.data.user) {
            const u = this.props.reviews.find(({ user }) => user.email === this.props.data.user.email);
            if (u) {
                return <li className="collection-item">You already reviewed this product</li>
            } else {
                return <li className="collection-item"><FormReview id={this.props.id} /></li>
            }
        }
        return <li className="collection-item">Please <Link to='login'>Log In</Link> to leave a review</li>
    }
    render() {
        return <section className="reviewSection">
            <ul className="collection with-header">
                <li className="collection-item reviewHeader">{this.renderRating()}</li>
                {this.renderFormOrMessage()}
                {this.renderReviews()}
            </ul>
        </section>
    }
}

export default graphql(query)(ProductReviews);
