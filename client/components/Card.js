import React from 'react';
import { hashHistory } from 'react-router';

export default ({ title, imageMain, price, priceSale, rating, id }) => {
    return <div className="card">
        <img src={imageMain} alt={title} className="responsive-img" onClick={() => hashHistory.push(`/products/${id}`)}/>
        <a onClick={() => console.log('shortcut to cart')} className="btn-floating right white cartShortcutBtn">
            <i className="material-icons cartShortcutBtnIcon">add_shopping_cart</i>
        </a>
        <ul className="cardInfo" onClick={() => hashHistory.push(`/products/${id}`)}>
            <li className="card-title">{title}</li>
            <li>
                <span className="price-big">{`$${priceSale || price}`}</span>
                <span className="price-small">{priceSale ? `$${price}` : ''}</span>
            </li>
            <li className="starRatingRow">{rating} / 5 <i className="material-icons" id="cardStar">star_rate</i></li>
        </ul>
    </div>;
}