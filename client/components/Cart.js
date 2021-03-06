import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

class Cart extends Component {
    renderGuestCart() {
        return this.props.cart.map(item => {
            const { pic, id, title, color, size, priceSale, price, shipping, quantity } = item;
            const s = size === 'oneSizeFitsAll' ? 'One size fits all' : size.toUpperCase();
            const p = Number(priceSale || price);
            if (quantity > 0) {
                return <tr key={`${id}${color}${size}`}>
                    <td><img className="cartItemImg" src={pic} /></td>
                    <td><Link to={`/products/${id}`}>{title}</Link></td>
                    <td className="cartSmallFont">{color}</td>
                    <td className="cartSmallFont">{s}</td>
                    <td><i onClick={() => this.props.decreaseByOne(item)} className="material-icons cartArrow">keyboard_arrow_left</i> <span className="cartQuantity">{quantity}</span> <i onClick={() => this.props.increaseByOne(item)} className="material-icons cartArrow">keyboard_arrow_right</i></td>
                    <td>${p.toFixed(2)}</td>
                    <td><i onClick={() => this.props.removeFromCart(item)} className="material-icons cursorPointer">cancel</i></td>
                </tr>;
            }
        });
    }
    renderSmallGuestCart() {
        return this.props.cart.map(item => {
            const { pic, id, title, color, size, priceSale, price, shipping, quantity } = item;
            const s = size === 'oneSizeFitsAll' ? 'One size fits all' : size.toUpperCase();
            const p = Number(priceSale || price);
            if (quantity > 0) {
                return <div key={`${id}${color}${size}`} className="smallCartItem">
                    <img className="responsive-img" src={pic} />
                    <div className="title"><Link to={`/products/${id}`}>{title}</Link></div>
                    <div>{color} <span className="colorGray">/</span> {s}</div>
                    <div>${p.toFixed(2)}</div>
                    <div className="smallCartLastRow">
                        <div className="quantitySelector">
                            <i onClick={() => this.props.decreaseByOne(item)} className="material-icons cartArrow">keyboard_arrow_left</i> <span>{quantity}</span> <i onClick={() => this.props.increaseByOne(item)} className="material-icons cartArrow">keyboard_arrow_right</i>
                        </div>
                        <i onClick={() => this.props.removeFromCart(item)} className="material-icons cursorPointer">cancel</i>
                    </div>
                </div>;
            }
        });
    }

    render() {
        if (!this.props.cart.length) {
            return <section className="cart container textWhite">
            <h3 className="textCenter">Cart</h3>
            <p className="textCenter">You did not put any items into this cart yet.</p>
            <div className="standardFlex">
                <button className="waves-effect waves-light btn  blue darken-2" onClick={() => hashHistory.push('products')}>Continue Shopping</button>
            </div>
        </section>
        }
        return <section className="cart container">
            <h3 className="textCenter textWhite">Cart</h3>
            <table className="centered bordered hide-on-small-only cartTable">
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>Title</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderGuestCart()}
                    <tr>
                        <td colSpan="7">
                            <h4 className="title paddingLeftRightTwenty">${this.props.allItemsCost.toFixed(2)}</h4>
                            <button className="waves-effect waves-light btn" onClick={() => hashHistory.push('checkout')}>Proceed To Checkout</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="hide-on-med-and-up">
                {this.renderSmallGuestCart()}
            </div>
            <div className="cartCheckoutSection cartCheckoutSectionSmall hide-on-med-and-up">
                <h4 className="title">${this.props.allItemsCost.toFixed(2)}</h4>
                <button className="waves-effect waves-light btn" onClick={() => hashHistory.push('checkout')}>Proceed To Checkout</button>
            </div>
            <h6 className="textCenter textWhite">OR</h6>
            <div className="standardFlex">
                <button className="waves-effect waves-light btn  blue darken-2" onClick={() => hashHistory.push('products')}>Continue Shopping</button>
            </div>
        </section>
    }
}

export default Cart;