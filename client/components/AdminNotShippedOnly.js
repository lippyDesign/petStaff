import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchUnshippedQuery from '../queries/fetchUnshipped';

class AdminNotShippedOnly extends Component {
    renderOrders() {
        return this.props.fetchUnshippedQuery.unshippedOrders.map(({ id, shippedOn }) => {
            return <li className='collection-item adminProductView adminOrderListItem' key={id}>
                    <Link to={`adminorders/${id}`}>{id}</Link><span>{shippedOn ? <i className="material-icons">local_shipping</i> : 'not shipped yet'}</span>
                </li>
        });
    }
    render() {
        if (this.props.fetchUnshippedQuery.loading) return <li className='collection-item'>Loading...</li>;
        if (!this.props.fetchUnshippedQuery.loading && this.props.fetchUnshippedQuery.unshippedOrders) {
            return <div>{this.renderOrders()}</div>
        }
        return <div />;
    }
}

export default graphql(fetchUnshippedQuery, { name: 'fetchUnshippedQuery' })(AdminNotShippedOnly);