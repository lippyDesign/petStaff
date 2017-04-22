import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { graphql } from 'react-apollo';
import firebase from 'firebase';

import fetchOrdersQuery from '../queries/fetchOrders';

class AdminAllOrders extends Component {
    componentWillMount() {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
            hashHistory.push('admin')
        }
    }
    renderOrders() {
        return this.props.fetchOrdersQuery.orders.map(({ id, shippedOn }) => {
            return <li className='collection-item adminProductView adminOrderListItem' key={id}>
                    <Link to={`adminorders/${id}`}>{id}</Link><span>{shippedOn ? <i className="material-icons">local_shipping</i> : 'not shipped yet'}</span>
                </li>
        });
    }
    render() {
        if (this.props.fetchOrdersQuery.loading) return <li className='collection-item'>Loading...</li>;
        if (!this.props.fetchOrdersQuery.loading && this.props.fetchOrdersQuery.orders) {
            return <div>{this.renderOrders()}</div>
        }
        return <div />;
    }
}

export default graphql(fetchOrdersQuery, { name: 'fetchOrdersQuery' })(AdminAllOrders);