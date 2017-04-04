import React, { Component } from 'react';
import { graphql } from 'react-apollo';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { guestCart: [] }
    }
    componentWillMount() {
        
    }
    renderGuestCart() {
        return this.props.cart.map(({ pic, id, title, color, size, priceSale, price }) => {
            const s = size === 'oneSizeFitsAll' ? 'One size fits all' : size.toUpperCase();
            return <li  key={id} className="collection-item cartItem">
                <span>
                    <span>${priceSale || price}</span>
                    <img src={pic} alt={title} className="cartItemImg"/>
                    <span>{`${title}: ${color}, ${s}`}</span>
                </span>
                <i className="material-icons">cancel</i>
            </li>
        });
    }
    getTotalPrice() {
        const num = this.props.cart.reduce((prev, curr) => {
            const p = curr.priceSale || curr.price;
            return prev + Number(p)
        }, 0);
        return num.toFixed(2);
    }
    render() {
        if (!this.props.cart.length) {
            return <section className="cart container">
            <h3>Cart</h3>
            <p>Cart is empty</p>
            <p>You may need to login to check the cart within your account</p>
            <p>Continue shopping</p>
        </section>
        }
        return <section className="cart container">
            <h3>Cart</h3>
            <ul className="collection with-header">
                <li className="collection-item collection-header cartItem">
                    <h5><span className="hide-on-med-and-down cartTotalTag">Cart total:</span><span>${this.getTotalPrice()}</span></h5>
                    <button className="waves-effect waves-light btn">Check Out <i className="material-icons left">payment</i></button>
                </li>
                {this.renderGuestCart()}
            </ul>
        </section>
    }
}

export default Cart;