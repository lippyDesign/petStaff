import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] }
    }
    componentWillUpdate(nextProps) {
        // this.props -- old props
        // nextProps -- next set of props that will be in place
        if (!this.props.data.user && nextProps.data.user) {
            // redirect to dashboard
            hashHistory.push('/products');
        }
    }
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        })
        .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }
    render() {
        return <div className="formWrapper textWhite">
            <h3 className="center-align">Login</h3>
            <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} buttonName="Login" />
        </div>;
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);
