import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/shippingAndReturns';

class ShippingAndReturns extends Component {
    render() {
        const { shippingAndReturns, content, loading } = this.props.data;
        if (loading) return <div />;
        return <div className="row container textCenter">
            <h3 className="textWhite">{shippingAndReturns ? shippingAndReturns.heading : ''}</h3>
            <p className="shippingAndReturnsSection">{shippingAndReturns ? shippingAndReturns.content : ''}</p>
        </div>;
    }
}

export default graphql(query)(ShippingAndReturns);