import React, { Component } from 'react';
import firebase from 'firebase';

import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, email: '', password: '', errors: [] }
    }
    componentWillMount() {
        const { currentUser } = firebase.auth();
        if (currentUser) {
            this.setState({ user: {
                email: currentUser.email,
                id: currentUser.uid
            }})
        }
    }
    onSubmit(event) {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                this.setState({ user: {
                    email: user.email,
                    id: user.uid
                }})
            })
            .catch(res => console.log(res))
    }
    render() {
        if (!this.state.user) {
            return <div className="row">
                <form className="col s12 m6 offset-m3 l4 offset-l4 textWhite" onSubmit={this.onSubmit.bind(this)}>
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
                    {this.state.errors.map(error => <div className="errors center-align" key={error}>{error}</div>)}
                    <button className="btn center-align col s12 l6 offset-l3">Submit</button>
                </form>
            </div>;
        }
        return <AdminDashboard />;
    }
}

export default Admin;
