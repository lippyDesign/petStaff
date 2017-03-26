import React, { Component } from 'react';
import firebase from 'firebase';

import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

class Admin extends Component {
    render() {
        const { currentUser } = firebase.auth();
        if (currentUser) return <AdminDashboard/>;
        return <AdminLogin />
    }
}

export default Admin;
