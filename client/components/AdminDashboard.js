import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';

import AdminProductList from './AdminProductList';

class AdminDashboard extends Component {
    logout() {
        firebase.auth().signOut()
            .then(() => hashHistory.push('/'))
            .catch(res => console.log(res))
    }
    render() {
        return <section className="adminDashboard">
            <h3 className="center-align textWhite">Admin Dashboard</h3>
            <div className="row container">
                <Link className="btn" to="/addProduct">Add Product</Link>
                <Link className="btn blue" to="/adminorders">Orders</Link>
                <a onClick={this.logout.bind(this)} className="right waves-effect waves-light btn red">Log Out</a>
            </div>
            <AdminProductList />
        </section>
    }
}

export default AdminDashboard;