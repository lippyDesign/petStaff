import React, { Component } from 'react';
import firebase from 'firebase';

import AdminDashboard from './AdminDashboard';

class Admin extends Component {
    render() {
        if (this.props.isLoggedIn) return <div>logged in</div>;
        return <div>not logged in</div>;
    }
}

export default Admin;