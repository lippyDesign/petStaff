import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Carousel from './Carousel';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { cardRevealed: false, selectedSize: '', selectedColor: ''}
    }
    componentWillMount(props) {
        const { sizes, colors, id } = this.props;
        this.setState({ id });
        if (colors.length === 1) {
            this.setState({ selectedColor: colors[0].value })
        }
        if (sizes.length === 1) {
            this.setState({ selectedSize: sizes[0].value })
        }
    }
    setSize(selectedSize) {
        this.setState({ selectedSize })
    }
    setColor(selectedColor) {
        this.setState({ selectedColor })
    }
    addToCartClicked() {
        if (this.state.selectedSize && this.state.selectedColor) {
            const { price, priceSale, title, shipping} = this.props;
            const pic = this.props.photos[0].url
            const product = { id: this.state.id, size: this.state.selectedSize, color: this.state.selectedColor, title, pic, price, priceSale, shipping };
            this.props.addToCart(product);
            Materialize.toast('Added to cart :)', 4000);
            this.setState({ cardRevealed: false });
        } else if (!this.state.selectedSize && this.state.selectedColor) {
            Materialize.toast('Please select size', 4000);
        } else if (this.state.selectedSize && !this.state.selectedColor) {
            Materialize.toast('Please select color', 4000);
        } else {
            Materialize.toast('Please select size & color', 4000);
        }
    }
    renderRating() {
        const { reviews } = this.props;
        if (!reviews.length) {
            return <span><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i><i className="material-icons reviewHeaderStar">star_border</i></span>
        }
        let ratingSum = reviews.reduce((prev, curr) => {
            return prev + curr.rating;
        }, 0);
        ratingSum = ratingSum / reviews.length;
        const stars = []
        while (ratingSum >= 1) {
            stars.push(<i key={ratingSum} className="material-icons reviewHeaderStar">star_rate</i>);
            ratingSum--;
        }
        if (ratingSum >= 0.5) {
            stars.push(<i key={ratingSum} className="material-icons">star_half</i>);
        }
        return <span>{stars}</span>
    }
    render() {
        const { title, photos, price, priceSale, colors, sizes, id, shipping } = this.props;
        let colorListClass = colors.length > 3 ? 'colorSelectorList marginBottomZero' : 'colorSelectorList';
        let sizeListClass = 'sizeSelectorList';
        if (colors.length > 6) {
            colorListClass = 'colorSelectorList marginBottomZero smallColorIcons';
            sizeListClass = 'sizeSelectorList marginBottomZero smallColorIcons';
        }
        const {cardRevealed, alreadyOpened } = this.state;
        let cardTwo = "cardReveal cardTwoInvisible displayNone";
        if (cardRevealed && alreadyOpened) cardTwo = "cardReveal cardTwoVisible";
        if (!cardRevealed && alreadyOpened) cardTwo = "cardReveal cardTwoInvisible";
        return <div className="card grey-text text-darken-4">
            <Carousel photos={photos} id={id} click showBullets />
            <a onClick={() => this.setState({ cardRevealed: true, alreadyOpened: true })} className="btn-floating right white cartShortcutBtn">
                <i className="material-icons cartShortcutBtnIcon">add_shopping_cart</i>
            </a>
            <ul className="cardInfo" onClick={() => hashHistory.push(`/products/${id}`)}>
                <li className="card-title">{title}</li>
                <li>
                    <span className="price-big">{`$${priceSale || price}`}</span>
                    <span className="price-small">{priceSale ? `$${price}` : ''}</span>
                    <span className="price-shipping">{shipping ? `$${shipping} shipping` : 'free shipping'}</span>
                </li>
                <li className="starRatingRow">{this.renderRating()}</li>
            </ul>
            <div className={cardTwo}>
                <ul className="cardInfo">
                    <li className="card-title">{title}<i onClick={() => this.setState({ cardRevealed: false })} className="material-icons right cursorPointer">close</i></li>
                    <li>
                        <span className="price-big">{`$${priceSale || price}`}</span>
                        <span className="price-small">{priceSale ? `$${price}` : ''}</span>
                        <span className="price-shipping">{shipping ? `$${shipping} shipping` : 'free shipping'}</span>
                    </li>
                    <li className="starRatingRow">{this.renderRating()}</li>
                </ul>
                <div className="divider"></div>
                <span className="cardLabelSmall">Size:</span>
                <ul className={sizeListClass}>
                    {sizes.map(({value, id}) => {
                        if (value === 'oneSizeFitsAll') return <li id='oneSizeFitsAll' key={id}>{'One Size Fits All'}</li>
                        return <li className={this.state.selectedSize === value ? 'activeBox' : ''} key={id} onClick={this.setSize.bind(this, value)}>{value.toUpperCase()}</li>
                    })}
                </ul>
                <div className="divider"></div>
                <span className="cardLabelSmall">Color:</span>
                <ul className={colorListClass}>
                    {colors.map(({value, id}) => {
                        value = value.replace(value[0], value[0].toUpperCase());
                        return <li className={this.state.selectedColor === value ? 'activeBox' : ''} key={id} onClick={this.setColor.bind(this, value)}>{value}</li>
                    })}
                </ul>

                <div className="checkoutButtonWrapper">
                    <button onClick={this.addToCartClicked.bind(this)} className="waves-effect waves-light btn">Add To Cart</button>
                    <i onClick={() => hashHistory.push(`/products/${id}`)} className="material-icons moreInfoIcon">more_vert</i>
                </div>
            </div>
        </div>;
    } 
}