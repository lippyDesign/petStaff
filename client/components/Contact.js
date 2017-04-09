import React, { Component } from 'react';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', message: '' }
    }
    onSubmit(e) {
        e.preventDefault();
        const { email, message } = this.state;
    }
    render() {
        return <div className="container row">
            <h3 className="textWhite textCenter">Contact Us</h3>
            <form className="col s12 l6 offset-l3 textWhite" onSubmit={this.onSubmit.bind(this)}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                </div> 
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="textarea1" className="materialize-textarea" placeholder="Message" value={this.state.message} onChange={e => this.setState({ message: e.target.value })}></textarea>
                    </div>
                </div>
                <div className="row">
                    <button className="btn center-align col s12 l6 offset-l3">Send</button>
                </div>
            </form>
        </div>;
    }
}

export default Contact;