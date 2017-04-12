import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchOrdersQuery from '../queries/fetchOrders';

class AdminOrders extends Component {

    renderOrders() {
        return this.props.fetchOrdersQuery.orders.map(({ id, shippedOn }) => {
            return <li className='collection-item adminProductView' key={id}>
                    <Link to={`adminorders/${id}`}>{id}</Link><span>{shippedOn ? <i className="material-icons">local_shipping</i> : 'not shipped yet'}</span>
                </li>
        });
    }
    render() {
        if (this.props.fetchOrdersQuery.loading) return <div className="container">Loading</div>;
        if (!this.props.fetchOrdersQuery.loading && this.props.fetchOrdersQuery.orders) {
            return <div className="container">
                <h3 className="textWhite textCenter">Admin Orders</h3>
                <ul className='collection'>{this.renderOrders()}</ul>
            </div>;
        }
        return <div />;
    }
}

export default graphql(fetchOrdersQuery, { name: 'fetchOrdersQuery' })(AdminOrders);