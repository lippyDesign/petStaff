import React, { Component } from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
    }
    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }
    render() {
        return <div className="row">
            <form className="col s12 m6 offset-m3 l4 offset-l4" onSubmit={this.onSubmit.bind(this)}>
                <div className="input-field">
                    <input
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})}
                        placeholder='Email'
                    />
                </div>
                <div className="input-field">
                    <input
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                        placeholder='Password'
                        type='password'
                    />
                </div>
                {this.props.errors.map(error => <div className="textRed center-align" key={error}>{error}</div>)}
                <button className="btn center-align col s12 l6 offset-l3">Submit</button>
            </form>
        </div>;
    }
}

export default AuthForm;
