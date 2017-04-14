import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import axios from 'axios';

import signUpMutation from '../mutations/Signup';
import addOrderMutation from '../mutations/AddOrder';
import addItemToOrderMutation from '../mutations/AddItemToOrder';
import currentUserQuery from '../queries/CurrentUser';

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
            createAccount: true,
            password: '',
            monthOrYearVisible: false,
            monthVisible: false,
            yearVisible: ''
        }
    }
    componentDidMount() {
        // if no items in cart, send user to products page
        if (!this.props.cart.length) return hashHistory.push('products');
        // populate form
        if (this.props.currentUserQuery.user) {
            let { shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cardExpiration, cvv,
            billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip} = this.props.currentUserQuery.user;
            let mo = '';
            let ye = '';
            if (cardExpiration) {
                const exp = cardExpiration.split('/');
                mo = exp[0];
                ye = exp[1];
            }
            this.setState({
                shippingFirst: shippingFirst || '',
                shippingLast: shippingLast || '',
                shippingEmail: shippingEmail || '',
                shippingPhone: shippingPhone || '',
                shippingStreet: shippingStreet || '',
                shippingCity: shippingCity || '',
                shippingState: shippingState || '',
                shippingZip: shippingZip || '',
                cardNumber: cardNumber || '',
                cardCvv: cvv || '',
                billingFirst: billingFirst || '',
                billingLast: billingLast || '',
                billingEmail: billingEmail || '',
                billingPhone: billingPhone || '',
                billingStreet: billingStreet || '',
                billingCity: billingCity || '',
                billingState: billingState || '',
                billingZip: billingZip || '',
                ye,
                mo
            })
        }
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
    showUserCreateForm() {
        const currentUser = this.props.currentUserQuery;
        if (!currentUser.user && !this.state.createAccount) {
            return <div className="textCenter row">
                <h5>Account Info</h5>
                <div>
                    <span>
                        <input type="checkbox" id="createAccount" onChange={() => this.setState({ createAccount: !this.state.createAccount })} checked={this.state.createAccount} />
                        <label htmlFor="createAccount">Create Account</label>
                    </span>
                </div>
            </div>;
        }
        if (!currentUser.user) {
            return <div className="row">
                <h5 className="textCenter">Account Info</h5>
                <div className="textCenter">
                    <span>
                        <input type="checkbox" id="createAccount" onChange={() => this.setState({ createAccount: !this.state.createAccount })} checked={this.state.createAccount} />
                        <label htmlFor="createAccount">Create Account</label>
                    </span>
                </div>
                <div className="input-field col s12 m4 offset-m4">
                    <lable>{this.state.shippingEmail}</lable>
                </div>
                <div className="input-field col s12 m4 offset-m4">
                    <input value={this.state.password} onChange={e => this.setState({password: e.target.value})} placeholder='account password' type='password' />
                </div>
            </div>;
        }
        return <div className="textCenter row">
            <div className="divider"></div>
            <h5>Account Info</h5>
            <div className="input-field col s12 accountLabel">
                <lable>{currentUser.user.email}</lable>
            </div>
        </div>;
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ uploading: true })
        const { sameAsShipping, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip,
            cardNumber, cardCvv, billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, password, mo, ye } = this.state;
        const shippingName = `${shippingFirst} ${shippingLast}`;
        const shippingAddress = `${shippingStreet}, ${shippingCity}, ${shippingState}, ${shippingZip}`;
        const billingName = sameAsShipping ? shippingName : `${billingFirst} ${billingLast}`;
        const billingAddress = sameAsShipping ? shippingAddress : `${billingStreet}, ${billingCity}, ${billingState}, ${billingZip}`;
        const expMonth = mo;
        const expYear = ye;
        const cardExpiration = `${expMonth}/${expYear}`;
        const t = new Date();
        const dateAndTime = t.toString();
        const currentUser = this.props.currentUserQuery;
        // validation
        const shippingVeryfied = [shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip].every(x => x.trim());
        const cardVeryfied = [cardNumber, cardCvv, expMonth, expYear].every(x => x.trim());
        let billingVeryfied = true;
        if (!sameAsShipping) {
            billingVeryfied = [billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip].every(x => x.trim());
        }
        if (!shippingVeryfied) Materialize.toast('Please check errors in shipping info', 4000);
        if (!cardVeryfied) Materialize.toast('Please check errors in credit card info', 4000);
        if (!billingVeryfied) Materialize.toast('Please check errors in billing info', 4000);
        if (!currentUser.user && this.state.createAccount) {
            if (password.trim().length < 4) {
                Materialize.toast('Please check account password', 4000);
                return this.setState({ uploading: false });
            }
        }
        const allVerified = [shippingVeryfied, cardVeryfied, billingVeryfied].every(x => x);
        if (!allVerified) return this.setState({ uploading: false });
        //create user if necessary and then place order
        if (!currentUser.user && this.state.createAccount) {
            const bf = sameAsShipping ? shippingFirst : billingFirst ;
            const bl = sameAsShipping ? shippingLast : billingLast;
            const be = sameAsShipping ? shippingEmail : billingEmail;
            const bp = sameAsShipping ? shippingPhone : billingPhone;
            const bs = sameAsShipping ? shippingStreet : billingStreet;
            const bc = sameAsShipping ? shippingCity : billingCity;
            const bst = sameAsShipping ? shippingState : billingState;
            const bz = sameAsShipping ? shippingZip : billingZip;
            this.props.signUpMutation({
                variables: {
                    email: shippingEmail,
                    password,
                    shippingFirst,
                    shippingLast,
                    shippingEmail,
                    shippingPhone,
                    shippingStreet,
                    shippingCity,
                    shippingState,
                    shippingZip,
                    billingFirst: bf,
                    billingLast: bl,
                    billingEmail: be,
                    billingPhone: bp,
                    billingStreet: bs,
                    billingCity: bc,
                    billingState: bst,
                    billingZip: bz,
                    cardNumber,
                    cardExpiration,
                    cvv: cardCvv
                },
                refetchQueries: [{ query: currentUserQuery }]
            })
            .then(() => {
                //submit order
                this.props.addOrderMutation({
                    variables: { shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, cardExpiration, cardCvv, dateAndTime, shippedOn: '' },
                    refetchQueries: [{ query: currentUserQuery }]
                }).then(order => {
                    const orderId = order.data.addOrder.id;
                    this.props.cart.forEach(item => {
                        const { color, size, title, price, priceSale, shipping, quantity } = item;
                        return this.props.addItemToOrderMutation({
                            variables: { orderId, color, size, title, price, priceSale, shipping, quantity, productId: item.id }
                        }).then(order => {

                            //send order confirmation email
                            axios.post('/contfirmationemail', {
                                email: shippingEmail, message: 'order placed'
                            })
                            .then(response => {
                                this.props.emptyCart();
                                hashHistory.push('orderplaced');
                            })
                            .catch(error => {
                                console.log(error);
                                this.setState({ uploading: false });
                                Materialize.toast('There was an error sending confirmation email', 4000);
                            });


                        })
                    })
                })
            })
            .catch(res => {
                const errors = res.graphQLErrors.map(error => error.message);
                errors.forEach(err => Materialize.toast(err, 4000));
                return this.setState({ uploading: false });
            });
        } else { // if no user to create, simply place order
            //submit order
            this.props.addOrderMutation({
                variables: { shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, cardExpiration, cardCvv, dateAndTime },
                refetchQueries: [{ query: currentUserQuery }]
            }).then(order => {
                const orderId = order.data.addOrder.id;
                this.props.cart.forEach(item => {
                    const { color, size, title, price, priceSale, shipping, quantity } = item;
                    return this.props.addItemToOrderMutation({
                        variables: { orderId, color, size, title, price, priceSale, shipping, quantity, productId: item.id }
                    }).then(order => {
                        
                        //send order confirmation email
                        axios.post('/contfirmationemail', {
                            email: shippingEmail, message: 'order placed'
                        })
                        .then(response => {
                            this.props.emptyCart();
                            hashHistory.push('orderplaced');
                        })
                        .catch(error => {
                            console.log(error);
                            this.setState({ uploading: false });
                            Materialize.toast('There was an error sending confirmation email', 4000);
                        });

                    })
                })
            })
        }
    }
    toggleMonth() {
        this.setState({ monthOrYearVisible: !this.state.monthOrYearVisible, monthVisible: !this.state.monthVisible })
    }
    toggleYear() {
        this.setState({ monthOrYearVisible: !this.state.monthOrYearVisible, yearVisible: !this.state.monthVisible })
    }
    selectMonth(mo) {
        this.setState({ mo });
        this.hideMonthAndYear();
    }
    selectYear(ye) {
        this.setState({ ye });
        this.hideMonthAndYear();
    }
    hideMonthAndYear() {
        this.setState({ monthOrYearVisible: false, monthVisible: false, yearVisible: false })
    }
    render() {
        const { sameAsShipping, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cardCvv,
        billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, monthOrYearVisible, monthVisible, yearVisible } = this.state;
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
                </div>
                <ul id="slide-out" className={`sideNav expSelectorList collection with-header ${monthVisible ? 'sideBarVisible' : ''}`}>
                    <li className="collection-header textCenter"><h5>Expiration Month</h5></li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '1')}>1 - January</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '2')}>2 - February</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '3')}>3 - March</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '4')}>4 - April</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '5')}>5 - May</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '6')}>6 - June</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '7')}>7 - July</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '8')}>8 - August</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '9')}>9 - September</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '10')}>10 - October</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '11')}>11 - November</li>
                    <li className="collection-item" onClick={this.selectMonth.bind(this, '12')}>12 - December</li>
                </ul>
                <ul id="slide-out" className={`sideNav expSelectorList collection with-header ${yearVisible ? 'sideBarVisible' : ''}`}>
                    <li className="collection-header textCenter"><h5>Expiration Year</h5></li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2017')}>2017</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2018')}>2018</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2019')}>2019</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2020')}>2020</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2021')}>2021</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2022')}>2022</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2023')}>2023</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2024')}>2024</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2025')}>2025</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2026')}>2026</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2027')}>2027</li>
                    <li className="collection-item" onClick={this.selectYear.bind(this, '2028')}>2028</li>
                </ul>
                <div className={monthOrYearVisible ? '' : 'displayNone'} id="sidenav-overlay" onClick={this.hideMonthAndYear.bind(this)}></div>
                <label className="expirationLabel">Expiration</label>
                <div className="expMonthAndYearSelector">
                    <div className="expMonthAndYear">
                        <span className="badge new blue darken-2" data-badge-caption="Month" onClick={this.toggleMonth.bind(this)}>{this.state.mo}</span>
                        <span className="badge new blue darken-2" data-badge-caption="Year" onClick={this.toggleYear.bind(this)}>{this.state.ye}</span>
                    </div>
                    <div className="input-field cvvInput">
                        <input value={this.state.cardCvv} onChange={e => this.setState({cardCvv: e.target.value})} placeholder='CVV' />
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
                <div className="divider"></div>
                {this.showUserCreateForm()}
                <div className="row">
                    {this.state.uploading ? <div className="row"><div className="progress col s12 m6 offset-m3"><div className="indeterminate"></div></div></div> : <button className="btn center-align col s12 m6 offset-m3">Purchase</button>}
                </div>
            </form>
        </section>
    }
}

export default graphql(signUpMutation, { name: 'signUpMutation' })(graphql(currentUserQuery, { name: 'currentUserQuery' })(graphql(addOrderMutation, {name: 'addOrderMutation'})(graphql(addItemToOrderMutation, {name : 'addItemToOrderMutation'})(CheckOut))));