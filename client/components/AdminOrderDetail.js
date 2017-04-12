import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchOrderDetailsQuery from '../queries/fetchOrderDetails';
import shipOrderMutation from '../mutations/ShipOrder';
import fetchOrdersQuery from '../queries/fetchOrders';

class AdminOrderDetail extends Component {
    toggleShipped(id, shippedOn) {
        let s = ''
        if (!shippedOn) {
            s = new Date().toString()
        }
        this.props.shipOrderMutation({
            variables: { id, shippedOn: s },
            optimisticResponse: {
                __typename: 'Mutation',
                updateOrderShipped: {
                    __typename: 'OrderType',
                    // Note that we can access the props of the container at `ownProps` if we
                    // need that information to compute the optimistic response
                    shippedOn: s
                },
            },
            refetchQueries: [{ query: fetchOrdersQuery }]
        })
        .then(() => console.log('rrr'))

    }
    render() {
        if (this.props.fetchOrderDetailsQuery.loading) return <div/>
        const { billingAddress, billingEmail, billingName, billingPhone, cardCvv, cardExpiration, cardNumber, dateAndTime, id, orderItems, shippingAddress, shippingEmail, shippingName, shippingPhone, user, shippedOn } = this.props.fetchOrderDetailsQuery.order;
        return <div className='paddingTopBottomFifty container'>
            <Link to='adminorders' className="btn-floating btn-large waves-effect waves-light blue darken-2"><i className="material-icons">keyboard_arrow_left</i></Link>
            <ul className='collection'>
                <li className='collection-item adminProductView'>
                    <span className="boldText">Order ID: <span>{id}</span></span>
                    <div className="switch">
                        <label>
                            Not Shipped
                            <input type="checkbox" onChange={this.toggleShipped.bind(this, id, shippedOn)} checked={shippedOn ? true : false} />
                            <span className="lever"></span>
                            Shipped
                        </label>
                    </div>
                </li>
                <li className="collection-item">
                    <h5>Shipping Info</h5>
                    {shippingAddress}<br />{shippingEmail}<br />{shippingName}<br />{shippingPhone}
                </li>
                <li className="collection-item">
                    <h5>Card Info</h5>
                    {cardNumber}<br />{cardExpiration}<br />{cardCvv}<br />
                </li>
                <li className="collection-item">
                    <h5>Billing Info</h5>
                    {billingAddress}<br />{billingEmail}<br />{billingName}<br />{billingPhone}
                </li>
                <li className="collection-item">
                    <h5>Other Info</h5>
                    <span  className="boldText">ordered on:</span> {dateAndTime}<br />
                    <span  className="boldText">ordered by:</span><br />{user ? user.email: 'not a user'}<br />{user ? user.id : ''}<br />
                    <span  className="boldText">shipped on:</span> {shippedOn || 'not shipped yet'}<br />
                </li>
                <li className="collection-item">
                    <h5>Items</h5>
                    <div className="divider"></div>
                    {orderItems.map(({ color, id, price, priceSale, quantity, shipping, size, title }) => {
                        return <div key={id}>
                            Item Id: {id}<br/>
                            <span className="boldText">{quantity}</span> x {title}<br />
                            color: <span>{color}</span><br />
                            size: <span>{size}</span><br />
                            Regular Price: ${price}<br />
                            {priceSale ? `Sale Price: $${priceSale}` : 'not on sale'}<br />
                            {shipping ? `Shipping cost: $${shipping}` : 'free shipping'}<br />
                            <div className="divider"></div>
                        </div>;
                    })}
                    <span  className="boldText">Total: </span> ${orderItems.reduce((prev, item) => {
                        const price = Number(item.priceSale || item.price);
                        const shipping = Number(item.shipping || '0');
                        return prev + (item.quantity * price) + (item.quantity * shipping);
                    }, 0).toFixed(2)}
                </li>
            </ul>
        </div>
    }
}

export default graphql(shipOrderMutation, { name: 'shipOrderMutation' })(graphql(fetchOrderDetailsQuery, { name: 'fetchOrderDetailsQuery', options: props => { return { variables: { id: props.params.id } } } })(AdminOrderDetail));