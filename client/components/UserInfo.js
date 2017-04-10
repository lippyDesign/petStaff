import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
            ye: ''
        }
    }
    componentWillMount() {
        let mo = '';
        let ye = '';
        if (this.props.userInfo.cardExpiration) {
            const exp = this.props.userInfo.cardExpiration.split('/');
            mo = exp[0];
            ye = exp[1];
            this.setState({ mo, ye })
        }
        console.log(mo)
        console.log(ye)
    }
    componentDidMount() {
        const elementOne = ReactDOM.findDOMNode(this.refs.expMonth);
        const elementTwo = ReactDOM.findDOMNode(this.refs.expDate);
        let { shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cardExpiration, cvv,
        billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip } = this.props.userInfo;
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
            cardExpiration: cardExpiration || '',
            cvv: cvv || '',
            billingFirst: billingFirst || '',
            billingLast: billingLast || '',
            billingEmail: billingEmail || '',
            billingPhone: billingPhone || '',
            billingStreet: billingStreet || '',
            billingCity: billingCity || '',
            billingState: billingState || '',
            billingZip: billingZip || ''
        })
        $(elementOne).ready(function() {
            $('select').material_select();
        });
        $(elementTwo).ready(function() {
            $('select').material_select();
        });
    }
    onSubmit() {

    }
    render() {
        console.log(this.props.userInfo)
        const { sameAsShipping, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, cardNumber, cardExpiration, cvv,
        billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip } = this.state;
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
                     <div className="input-field col s12 m4">
                        <select ref="expMonth" defaultValue={this.state.mo}>
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
                        <select ref="expYear" defaultValue={this.state.ye}>
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
export default UserInfo;