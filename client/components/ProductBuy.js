import React, { Component } from 'react';

export default class extends Component {
    render() {
        const { title, priceSale, price, reviews, sizes, colors } = this.props;
        return <section className="productBuy">
            <ul className="cardInfo">
                <li className="card-title"><h3>{title}</h3></li>
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

            <div className="checkoutButtonWrapperProductView">
                <button className="waves-effect waves-light btn">Add To Cart</button>
            </div>
        </section>;
    }
}