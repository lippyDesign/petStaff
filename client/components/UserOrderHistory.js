import React, { Component } from 'react';

class UserOrderHistory extends Component {
    renderOrderItems() {
        if (!this.props.userOrders.length) return <li className="collection-item">No orders yet</li>;
        return this.props.userOrders.map(({ dateAndTime, id, orderItems, shippedOn }) => {
            const d = dateAndTime.slice(4, 15);
            const items = orderItems.map(({ id, title, quantity }) => <span key={id}><span className="boldText">{quantity}</span> x {title}<br /></span>);
            return <li className="collection-item" key={id}>
                {items}
                <span className="boldText">ordered on: </span>{d}
                <span className="boldText"><br />shipped on: </span>{shippedOn || 'not shipped yet'}
            </li>;
        })
    }
    render() {
        return <section className="userOrderHistory">
            <h3 className="textCenter textWhite">Order History</h3>
            <ul className="collection orderHistoryList">
                {this.renderOrderItems()}
            </ul>
        </section>
    }
}

export default UserOrderHistory;