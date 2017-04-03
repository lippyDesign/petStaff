import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import ReviewStar from './ReviewStar';

import mutation from '../mutations/AddReviewToProduct';

class FormReview extends Component {
    constructor(props) {
        super(props);
        this.state = { ratingHover: 0, ratingClick: 0, reviewText: '' }
    }
    onStarMouseEnter(ratingHover) {
        this.setState({ ratingHover });
    }
    onStarMouseLeave() {
        this.setState({ ratingHover: 0 });
    }
    onStarClick(ratingClick) {
        this.setState({ ratingClick });
    }
    renderStars() {
        return [1,2,3,4,5].map(num => {
            return <ReviewStar
                ratingHover={this.state.ratingHover}
                ratingClick={this.state.ratingClick}
                key={num}
                starValue={num}
                onStarMouseEnter={this.onStarMouseEnter.bind(this, num)}
                onStarMouseLeave={this.onStarMouseLeave.bind(this)}
                onStarClick={this.onStarClick.bind(this, num)}
            />
        });
    }
    onReviewSubmit(e) {
        e.preventDefault();
        const { ratingClick, reviewText } = this.state;
        if (!ratingClick) return Materialize.toast('Please select star rating', 3500);
        if (!reviewText.trim()) return Materialize.toast('Review text is required', 3500);
        console.log(this.state.ratingClick, this.state.reviewText.trim())
        this.props.mutate({
            variables: { productId: this.props.id, content: reviewText, rating: ratingClick }
        }).then(() => {
            window.location.reload();
        });
    }
    render() {
        return <form className='review-form' onSubmit={this.onReviewSubmit.bind(this)}>
            <textarea onChange={e => this.setState({reviewText: e.target.value})} value={this.state.reviewText} placeholder='Add a Review' className="materialize-textarea reviewTextField"></textarea>
            <div className="row reviewSubmit">
                <ul className="ReviewStarList">
                    {this.renderStars()}
                </ul>
                <button className="waves-effect waves-light btn">Submit</button>
            </div>
        </form>;
    }
}

export default graphql(mutation)(FormReview);