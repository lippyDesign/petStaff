import React, { Component } from 'react';

export default class extends Component {
    render() {
        const { starValue, ratingHover, ratingClick } = this.props;
        let starKind = 'star_border';
        if (starValue <= ratingClick) {
            starKind = 'star_rate';
        }
        if (starValue <= ratingHover) {
            starKind = 'star_rate';
        }
        return <li className="ReviewStarListItem"
            onMouseEnter={this.props.onStarMouseEnter}
            onMouseLeave={this.props.onStarMouseLeave}
            onClick={this.props.onStarClick}
            >
            <i className="material-icons reviewHeaderStarToReview">
                {starKind}
            </i>
        </li>;
    }
}