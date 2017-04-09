import React, { Component } from 'react';

class UserDeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { password: '' }
    }
    onSubmit() {

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

export default UserDeleteAccount;