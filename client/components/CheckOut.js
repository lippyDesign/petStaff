import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
            cvv: ''
        }
    }
    componentDidMount() {
        const elementOne = ReactDOM.findDOMNode(this.refs.expMonth);
        const elementTwo = ReactDOM.findDOMNode(this.refs.expDate);

        $(elementOne).ready(function() {
            $('select').material_select();
        });
        $(elementTwo).ready(function() {
            $('select').material_select();
        });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.refs.expMonth.value)
        console.log(this.refs.expDate.value)
    }
    render() {
        return <section className="checkOut container">
            <h3 className="textWhite textCenter">Check Out</h3>
            <form onSubmit={this.onSubmit.bind(this)} className="checkOutForm">
                <h5>Shipping Info</h5>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={this.state.shippingFirst} onChange={e => this.setState({shippingFirst: e.target.value})} placeholder='First Name' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={this.state.shippingLast} onChange={e => this.setState({shippingLast: e.target.value})} placeholder='Last Name' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={this.state.shippingEmail} onChange={e => this.setState({shippingEmail: e.target.value})} placeholder='Email' type='email' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={this.state.shippingPhone} onChange={e => this.setState({shippingPhone: e.target.value})} placeholder='Phone Number' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={this.state.shippingStreet} onChange={e => this.setState({shippingStreet: e.target.value})} placeholder='Street' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={this.state.shippingCity} onChange={e => this.setState({shippingCity: e.target.value})} placeholder='City' />
                    </div>
                    <div className="input-field col s12 m2">
                        <input value={this.state.shippingState} onChange={e => this.setState({shippingState: e.target.value})} placeholder='State' />
                    </div>
                    <div className="input-field col s12 m4">
                        <input value={this.state.shippingZip} onChange={e => this.setState({shippingZip: e.target.value})} placeholder='Zip Code' />
                    </div>
                </div>
                <h5>Card Info</h5>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={this.state.cardNumber} onChange={e => this.setState({cardNumber: e.target.value})} placeholder='Card Number' />
                    </div>
                     <div className="input-field col s12 m4">
                        <select ref="expMonth" defaultValue="none">
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
                        <select ref="expDate" defaultValue="none">
                            <option value="" disabled>Date</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="0">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">15</option>
                            <option value="26">16</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>      
                    </div>
                    <div className="input-field col s12 m4">
                        <input value={this.state.cvv} onChange={e => this.setState({cvv: e.target.value})} placeholder='CVV' />
                    </div>
                </div>
                <h5>Billing Info</h5>
                <span>
                    <input type="checkbox" id="sameAsShipping" onChange={() => this.setState({ sameAsShipping: !this.state.sameAsShipping })} checked={this.state.sameAsShipping} />
                    <label htmlFor="sameAsShipping">Same As Shipping</label>
                </span>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={this.state.billingFirst} onChange={e => this.setState({billingFirst: e.target.value})} placeholder='First Name' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={this.state.billingLast} onChange={e => this.setState({billingLast: e.target.value})} placeholder='Last Name' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input value={this.state.billingEmail} onChange={e => this.setState({billingEmail: e.target.value})} placeholder='Email' type='email' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={this.state.billingPhone} onChange={e => this.setState({billingPhone: e.target.value})} placeholder='Phone Number' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={this.state.billingStreet} onChange={e => this.setState({billingStreet: e.target.value})} placeholder='Street' />
                    </div>
                    <div className="input-field col s12 m6">
                        <input value={this.state.billingCity} onChange={e => this.setState({billingCity: e.target.value})} placeholder='City' />
                    </div>
                    <div className="input-field col s12 m2">
                        <input value={this.state.billingState} onChange={e => this.setState({billingState: e.target.value})} placeholder='State' />
                    </div>
                    <div className="input-field col s12 m4">
                        <input value={this.state.billingZip} onChange={e => this.setState({billingZip: e.target.value})} placeholder='Zip Code' />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {this.state.errors.map(error => <div className="textRed center-align" key={error}>{error}</div>)}
                    </div>
                    <button className="btn center-align col s12 m6 offset-m3">Purchase</button>
                </div>
            </form>
        </section>
    }
}

export default CheckOut;