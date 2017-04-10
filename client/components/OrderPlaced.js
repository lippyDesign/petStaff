import React from 'react';
import { hashHistory } from 'react-router';

export default () => <section className="orderPlaced textCenter paddingTopBottomFifty">
    <h3 className="textWhite">Your Order Has Been Placed</h3>
    <p className="textWhite">
        We sent you a confirmation email with the details of your order.
    </p>
    <button className="waves-effect waves-light btn  blue darken-2" onClick={() => hashHistory.push('products')}>Continue Shopping</button>
</section>