import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', message: '', sending: false }
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ sending: true });
        const { email, message } = this.state;
        if (message.trim() && email.trim()) {
            axios.post('/contactus', {
                email, message
            })
            .then(response => {
                Materialize.toast('Message Sent!', 4000);
                this.setState({ email: '', message: '', sending: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ sending: false });
                Materialize.toast('There was an error', 4000);
            });
        } else {
            Materialize.toast('Email and Message are required', 4000);
        }
    }
    render() {
        return <div className="container row">
            <h3 className="textWhite textCenter">Contact Us</h3>
            <form className="col s12 l6 offset-l3 contactUsForm" onSubmit={this.onSubmit.bind(this)}>
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
                    {this.state.sending ?<div className="progress"><div className="indeterminate"></div></div> : <button className="btn center-align col s12 l6 offset-l3">Send</button>}
                </div>
            </form>
        </div>;
    }
}

export default Contact;