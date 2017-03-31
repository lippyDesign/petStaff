import React from 'react';
import { hashHistory } from 'react-router';

import Carousel from './Carousel';

export default ({ title, photos, price, priceSale, colors, sizes, reviews, id }) => {

    return <div className="card grey-text text-darken-4">
        <Carousel photos={photos} id={id} click/>
        <a onClick={() => console.log('shortcut to cart')} className="btn-floating right white cartShortcutBtn">
            <i className="material-icons cartShortcutBtnIcon">add_shopping_cart</i>
        </a>
        <ul className="cardInfo" onClick={() => hashHistory.push(`/products/${id}`)}>
            <li className="card-title">{title}</li>
            <li>
                <span className="price-big">{`$${priceSale || price}`}</span>
                <span className="price-small">{priceSale ? `$${price}` : ''}</span>
            </li>
            <li className="starRatingRow">{reviews.length ? reviews : '0 / 0'} <i className="material-icons" id="cardStar">star_rate</i></li>
        </ul>
        <div className="cardReveal">
            <ul className="cardInfo">
                <li className="card-title">{title}<i className="material-icons right">close</i></li>
                <li>
                    <span className="price-big">{`$${priceSale || price}`}</span>
                    <span className="price-small">{priceSale ? `$${price}` : ''}</span>
                </li>
                <li className="starRatingRow">{reviews.length ? reviews : '0 / 0'} <i className="material-icons" id="cardStar">star_rate</i></li>
            </ul>
            <div className="divider"></div>
            <span className="cardLabelSmall">Size:</span>
            <ul className="sizeSelectorList">
                {sizes.map(({value, id}) => {
                    if (value === 'oneSizeFitsAll') return <li id='oneSizeFitsAll' key={id}>{'One Size Fits All'}</li>
                    return <li key={id}>{value.toUpperCase()}</li>
                })}
            </ul>
            <div className="divider"></div>
            <span className="cardLabelSmall">Color:</span>
            <ul className="colorSelectorList">
                {colors.map(({value, id}) => <li key={id}>{value}</li>)}
            </ul>

            <div className="checkoutButtonWrapper">
                <button className="waves-effect waves-light btn">Add To Cart</button>
                <i onClick={() => hashHistory.push(`/products/${id}`)} className="material-icons moreInfoIcon">more_vert</i>
            </div>
        </div>
    </div>; 
}