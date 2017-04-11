import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';

import UserOrderHistory from './UserOrderHistory';
import UserInfo from './UserInfo';
import UserDeleteAccount from './UserDeleteAccount';

class Dashboard extends Component {
    render() {
        if (!this.props.currentUserQuery.user) return <div/>
        return <section className="dashboard container">
            <div className="row">
                <div className="col s12 l6">
                    <UserOrderHistory userOrders={this.props.currentUserQuery.user.orders} />
                </div>
                <div className="col s12 l6">
                    <UserInfo userInfo={this.props.currentUserQuery.user} />
                </div>
                <div className="col s12 l4 offset-l4">
                    <UserDeleteAccount userEmail={this.props.currentUserQuery.user.email} userId={this.props.currentUserQuery.user.id} />
                </div>
            </div>
        </section>;
    }
}
export default graphql(currentUserQuery, { name: 'currentUserQuery' })(Dashboard);