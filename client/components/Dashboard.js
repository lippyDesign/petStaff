import React, { Component } from 'react';

import UserOrderHistory from './UserOrderHistory';
import UserInfo from './UserInfo';
import UserDeleteAccount from './UserDeleteAccount';

class Dashboard extends Component {
    render() {
        return <section className="dashboard container">
            <div className="row">
                <div className="col s12 l6">
                    <UserOrderHistory />
                </div>
                <div className="col s12 l6">
                    <UserInfo />
                </div>
                <div className="col s12 l4 offset-l4">
                    <UserDeleteAccount />
                </div>
            </div>
        </section>;
    }
}
export default Dashboard;