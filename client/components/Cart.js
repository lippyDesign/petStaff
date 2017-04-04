import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { guestCart: [] }
    }
    renderGuestCart() {
        return this.props.cart.map(item => {
            const { pic, id, title, color, size, priceSale, price, shipping, quantity } = item;
            const s = size === 'oneSizeFitsAll' ? 'One size fits all' : size.toUpperCase();
            const p = shipping ? Number(shipping) + Number(priceSale || price) : Number(priceSale || price);
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
            const p = shipping ? Number(shipping) + Number(priceSale || price) : Number(priceSale || price);
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
                    <div className="divider"></div>
                </div>;
            }
        });
    }
    getTotalPrice() {
        const num = this.props.cart.reduce((prev, curr) => {
            const p = curr.priceSale || curr.price;
            const s = curr.shipping || "0";
            return (Number(p) + Number(s)) * curr.quantity + prev
        }, 0);
        return num.toFixed(2);
    }
    render() {
        if (!this.props.cart.length) {
            return <section className="cart container">
            <h3 className="textCenter">Cart</h3>
            <p>Cart is empty</p>
            <div className="standardFlex">
                <Link to="products"><h4>Continue Shopping</h4></Link>
            </div>
        </section>
        }
        return <section className="cart container">
            <h3 className="textCenter">Cart</h3>
            <table className="centered bordered hide-on-small-only">
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
                </tbody>
            </table>
            <div className="hide-on-med-and-up">
                {this.renderSmallGuestCart()}
            </div>
            <div className="cartCheckoutSection">
                <h4 className="title paddingLeftRightTwenty">${this.getTotalPrice()}</h4>
                <button className="waves-effect waves-light btn">Proceed To Checkout</button>
            </div>
            <h6 className="textCenter">OR</h6>
            <div className="standardFlex">
                <Link to="products"><h4>Continue Shopping</h4></Link>
            </div>
        </section>
    }
}

export default Cart;