import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import addOrderMutation from '../mutations/AddOrder';
import addItemToOrderMutation from '../mutations/AddItemToOrder';

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shippingFirst: '',
            shippingLast: '',
            shippingEmail: '',
            shippingPhone: '',
            shippingStreet: '',
            shippingCity: '',
            shippingState: '',
            shippingZip: '',
            errors: [],
            sameAsShipping: false,
            billingFirst: '',
            billingLast: '',
            billingEmail: '',
            billingPhone: '',
            billingStreet: '',
            billingCity: '',
            billingState: '',
            billingZip: '',
            cardNumber: '',
            cardCvv: '',
            uploading: false,
            completeOrder: null
        }
    }
    componentDidMount() {
        if (!this.props.cart.length) return hashHistory.push('products');

        const elementOne = ReactDOM.findDOMNode(this.refs.expMonth);
        const elementTwo = ReactDOM.findDOMNode(this.refs.expDate);
        $(elementOne).ready(function() {
            $('select').material_select();
        });
        $(elementTwo).ready(function() {
            $('select').material_select();
        });
    }
    renderItems() {
        return this.props.cart.map(({ id, title, priceSale, price, quantity, color, size }) => {
            const p = priceSale || price;
            const pr = Number(p) * Number(quantity);
            return <li key={`${id}${size}${color}`} className="collection-item checkoutListItem">
                <div>
                    <span className="boldText">{quantity}</span> x <Link to={`/products/${id}`}>{title}</Link><br />
                    <span>{color}</span><br />
                    <span>{size === 'oneSizeFitsAll' ? 'One Size Fits All' : size.toUpperCase()}</span>
                </div>
                <span>${pr.toFixed(2)}</span>
            </li>
        })
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ uploading: true })
        const { sameAsShipping, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip,
            cardNumber, cardCvv, billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip } = this.state;
        const shippingName = `${shippingFirst} ${shippingLast}`;
        const shippingAddress = `${shippingStreet}, ${shippingCity}, ${shippingState}, ${shippingZip}`;
        const billingName = sameAsShipping ? shippingName : `${billingFirst} ${billingLast}`;
        const billingAddress = sameAsShipping ? shippingAddress : `${billingStreet}, ${billingCity}, ${billingState}, ${billingZip}`;
        const expMonth = this.refs.expMonth.value;
        const expYear = this.refs.expYear.value;
        const cardExpiration = `${expMonth}/${expYear}`;
        const dateAndTime = new Date();

        const shippingVeryfied = [shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip].every(x => x.trim());
        const cardVeryfied = [cardNumber, cardCvv, expMonth, expYear].every(x => x.trim());
        let billingVeryfied = true;
        if (!sameAsShipping) {
            billingVeryfied = [billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip].every(x => x.trim());
        }
        if (!shippingVeryfied) Materialize.toast('Please check errors in shipping info', 4000);
        if (!cardVeryfied) Materialize.toast('Please check errors in credit card info', 4000);
        if (!billingVeryfied) Materialize.toast('Please check errors in billing info', 4000);
        const allVerified = [shippingVeryfied, cardVeryfied, billingVeryfied].every(x => x);
        if (!allVerified) return this.setState({ uploading: false });
        this.props.addOrderMutation({
            variables: { shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, cardExpiration, cardCvv, dateAndTime },
            // refetchQueries: [{ query }]
        }).then(order => {
            const orderId = order.data.addOrder.id;
            this.props.cart.forEach(item => {
                const { color, size, title, price, priceSale, shipping, quantity } = item;
                return this.props.addItemToOrderMutation({
                    variables: { orderId, color, size, title, price, priceSale, shipping, quantity, productId: item.id }
                }).then(order => {
                    console.log(order);
                    hashHistory.push(`/orders/${order.data.addItemToOrder.id}`)
                })
            })
        })
    }
    render() {
        const { sameAsShipping, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cardCvv,
        billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip } = this.state;
        return <section className="checkOut container">
            <h3 className="textWhite textCenter">Check Out</h3>
            <form onSubmit={this.onSubmit.bind(this)} className="checkOutForm">
                <h5>Shipping Info</h5>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={shippingFirst} onChange={e => this.setState({shippingFirst: e.target.value})} placeholder='First Name' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={shippingLast} onChange={e => this.setState({shippingLast: e.target.value})} placeholder='Last Name' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={shippingEmail} onChange={e => this.setState({shippingEmail: e.target.value})} placeholder='Email' type='email' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={shippingPhone} onChange={e => this.setState({shippingPhone: e.target.value})} placeholder='Phone Number' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={shippingStreet} onChange={e => this.setState({shippingStreet: e.target.value})} placeholder='Street' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={shippingCity} onChange={e => this.setState({shippingCity: e.target.value})} placeholder='City' />
                    </div>
                    <div className="input-field col s12 m2">
                        <input value={shippingState} onChange={e => this.setState({shippingState: e.target.value})} placeholder='State' />
                    </div>
                    <div className="input-field col s12 m4">
                        <input value={shippingZip} onChange={e => this.setState({shippingZip: e.target.value})} placeholder='Zip Code' />
                    </div>
                </div>
                <h5>Card Info</h5>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={cardNumber} onChange={e => this.setState({cardNumber: e.target.value})} placeholder='Card Number' />
                    </div>
                     <div className="input-field col s12 m4">
                        <select ref="expMonth" defaultValue="">
                            <option value="" disabled>Month</option>
                            <option value="1">1 January</option>
                            <option value="2">2 February</option>
                            <option value="3">3 March</option>
                            <option value="4">4 April</option>
                            <option value="5">5 May</option>
                            <option value="6">6 June</option>
                            <option value="7">7 July</option>
                            <option value="8">8 August</option>
                            <option value="9">9 September</option>
                            <option value="0">10 October</option>
                            <option value="11">11 November</option>
                            <option value="12">12 December</option>
                        </select>
                        <label>Expiration</label>
                    </div>
                    <div className="input-field col s12 m4">
                        <select ref="expYear" defaultValue="">
                            <option value="" disabled>Year</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>      
                    </div>
                    <div className="input-field col s12 m4">
                        <input value={cardCvv} onChange={e => this.setState({cardCvv: e.target.value})} placeholder='cvv' />
                    </div>
                </div>
                <h5>Billing Info</h5>
                <span>
                    <input type="checkbox" id="sameAsShipping" onChange={() => this.setState({ sameAsShipping: !this.state.sameAsShipping })} checked={sameAsShipping} />
                    <label htmlFor="sameAsShipping">Same As Shipping</label>
                </span>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={sameAsShipping ? shippingFirst : billingFirst} onChange={e => this.setState({billingFirst: e.target.value})} placeholder='First Name' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={sameAsShipping ? shippingLast : billingLast} onChange={e => this.setState({billingLast: e.target.value})} placeholder='Last Name' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={sameAsShipping ? shippingEmail : billingEmail} onChange={e => this.setState({billingEmail: e.target.value})} placeholder='Email' type='email' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={sameAsShipping ? shippingPhone : billingPhone} onChange={e => this.setState({billingPhone: e.target.value})} placeholder='Phone Number' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={sameAsShipping ? shippingStreet : billingStreet} onChange={e => this.setState({billingStreet: e.target.value})} placeholder='Street' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={sameAsShipping ? shippingCity : billingCity} onChange={e => this.setState({billingCity: e.target.value})} placeholder='City' />
                    </div>
                    <div className="input-field col s12 m2">
                        <input value={sameAsShipping ? shippingState : billingState} onChange={e => this.setState({billingState: e.target.value})} placeholder='State' />
                    </div>
                    <div className="input-field col s12 m4">
                        <input value={sameAsShipping ? shippingZip : billingZip} onChange={e => this.setState({billingZip: e.target.value})} placeholder='Zip Code' />
                    </div>
                </div>
                <h5>Your Order</h5>
                <div className="row">
                    <ul className="col s12 collection">
                        {this.renderItems()}
                    </ul>
                    <div className="orderSummary">
                        <p>Order: ${this.props.allItemsCost.toFixed(2)}</p>
                        <p>Shipping: ${this.props.allShippingCost.toFixed(2)}</p>
                        <p>Total: ${this.props.totalCost.toFixed(2)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {this.state.errors.map(error => <div className="textRed center-align" key={error}>{error}</div>)}
                    </div>
                    {this.state.uploading ? <div className="row"><div className="progress col s12 m6 offset-m3"><div className="indeterminate"></div></div></div> : <button className="btn center-align col s12 m6 offset-m3">Purchase</button>}
                </div>
            </form>
        </section>
    }
}

export default graphql(addOrderMutation, {name: 'addOrderMutation'})(graphql(addItemToOrderMutation, {name : 'addItemToOrderMutation'})(CheckOut));