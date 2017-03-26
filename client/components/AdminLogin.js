import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import firebase from 'firebase';

import AuthForm from './AuthForm';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] }
    }
    onSubmit({ email, password }) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => console.log('signed in'))
            .catch(res => console.log(res))
    }
    render() {
        return <div>
            <h3 className="center-align">Admin Login</h3>
            <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
        </div>;
    }
}

export default AdminLogin;
