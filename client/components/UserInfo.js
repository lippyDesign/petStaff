import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'react-apollo';

import updateUserMutation from '../mutations/UpdateUser';
import currentUserQuery from '../queries/CurrentUser';

class UserInfo extends Component {
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
            cardExpiration: '',
            cvv: '',
            mo: '',
            ye: '',
            monthOrYearVisible: false,
            monthVisible: false,
            yearVisible: ''
        }
    }
    componentDidMount() {
        let { shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cardExpiration, cvv,
        billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip} = this.props.userInfo;
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
            cvv: cvv || '',
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
    onSubmit(e) {
        e.preventDefault();
        const { sameAsShipping, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cvv,
        billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, mo, ye } = this.state;
        const { id } = this.props.userInfo;
        const bf = sameAsShipping ? shippingFirst : billingFirst ;
        const bl = sameAsShipping ? shippingLast : billingLast;
        const be = sameAsShipping ? shippingEmail : billingEmail;
        const bp = sameAsShipping ? shippingPhone : billingPhone;
        const bs = sameAsShipping ? shippingStreet : billingStreet;
        const bc = sameAsShipping ? shippingCity : billingCity;
        const bst = sameAsShipping ? shippingState : billingState;
        const bz = sameAsShipping ? shippingZip : billingZip;
        const cardExpiration = `${mo}/${ye}`;

        this.props.updateUserMutation({
            variables: {
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
                    cvv
                },
                refetchQueries: [{ query: currentUserQuery }]
        }).then(() => Materialize.toast('User Info Updated', 4000));
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
        const { sameAsShipping, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cardExpiration, cvv,
        billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, monthOrYearVisible, monthVisible, yearVisible} = this.state;
        return <section className="userShippingInfo">
            <h3 className="textCenter textWhite">User Info</h3>
            <form onSubmit={this.onSubmit.bind(this)} className="checkOutForm">
                <h5>Account Info</h5>
                <div className="row"><p className="paddingLeftRightTwenty">{this.props.userInfo.email}</p></div>
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
                        <input value={this.state.cvv} onChange={e => this.setState({cvv: e.target.value})} placeholder='CVV' />
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
                <div className="row">
                    <button className="btn center-align col s12 m6 offset-m3">Save</button>
                </div>
            </form>
        </section>
    }
}
export default graphql(updateUserMutation, { name: 'updateUserMutation' })(UserInfo);