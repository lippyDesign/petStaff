import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import deleteUserMutation from '../mutations/DeleteUser';
import loginMutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class UserDeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { password: '' }
    }
    onSubmit(e) {
        e.preventDefault();
        return this.props.loginMutation({
            variables: { email: this.props.userEmail, password: this.state.password },
        })
        .then(() => {
            return this.props.deleteUserMutation({
                variables: { id: this.props.userId },
                refetchQueries: [{ query }]
            })
        })
        .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            errors.map(error => Materialize.toast(error, 4000));
        });
    }
    render() {
        return <section className="userDeleteAccount">
            <h3 className="textCenter textWhite">Delete Account</h3>
            <form className="textWhite" onSubmit={this.onSubmit.bind(this)}>
                <div className="input-field">
                    <input
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                        placeholder='Password'
                        type='password'
                    />
                </div>
                <button className="btn center-align col s12 l4 offset-l4 red">Delete</button>
            </form>
        </section>
    }
}

export default graphql(loginMutation, { name: 'loginMutation' })(graphql(deleteUserMutation, { name: 'deleteUserMutation' })(UserDeleteAccount));