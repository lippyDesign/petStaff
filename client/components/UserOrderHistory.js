import React, { Component } from 'react';
import { Link } from 'react-router';

class UserOrderHistory extends Component {
    renderOrderItems() {
        if (!this.props.userOrders.length) return <li className="collection-item">No orders yet</li>;
        return this.props.userOrders.map(({ dateAndTime, id, orderItems, shippedOn }) => {
            const d = dateAndTime.slice(4, 15);
            const items = orderItems.map(({ id, title, quantity }) => <span key={id}><span className="boldText">{quantity}</span> x {title}<br /></span>);
            return <li className="collection-item adminProductView" key={id}>
                <span>
                    {items}
                    <span className="boldText">ordered on: </span>{d}
                    <span className="boldText"><br />shipped on: </span>{shippedOn ? shippedOn.slice(4, 15) : 'not shipped yet'}
                </span>
                <Link to={`/userorders/${id}`}><i className="material-icons">more_vert</i></Link>
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