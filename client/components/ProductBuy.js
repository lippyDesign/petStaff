import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedSize: '', selectedColor: '' };
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
            const product = { id: this.state.id, size: this.state.selectedSize, color: this.state.selectedColor };
            console.log(product)
            Materialize.toast('Added to cart :)', 4000);
            this.setState({ cardRevealed: false, selectedSize: '', selectedColor: '' });
        } else if (!this.state.selectedSize && this.state.selectedColor) {
            Materialize.toast('Please select size', 4000);
        } else if (this.state.selectedSize && !this.state.selectedColor) {
            Materialize.toast('Please select color', 4000);
        } else {
            Materialize.toast('Please select size & color', 4000);
        }
    }
    render() {
        const { title, priceSale, price, reviews, sizes, colors } = this.props;
        return <section className="productBuy">
            <ul className="cardInfo">
                <li className="title">{title}</li>
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
                    return <li key={id} onClick={this.setSize.bind(this, value)} className={this.state.selectedSize === value ? 'activeBox' : ''}>{value.toUpperCase()}</li>
                })}
            </ul>
            <div className="divider"></div>
            <span className="cardLabelSmall">Color:</span>
            <ul className="colorSelectorList">
                {colors.map(({value, id}) => <li className={this.state.selectedColor === value ? 'activeBox' : ''} key={id} onClick={this.setColor.bind(this, value)}>{value}</li>)}
            </ul>

            <div className="checkoutButtonWrapperProductView">
                <button onClick={this.addToCartClicked.bind(this)} className="waves-effect waves-light btn">Add To Cart</button>
            </div>
        </section>;
    }
}