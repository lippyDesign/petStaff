import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

import AdminAllOrders from './AdminAllOrders';
import AdminNotShippedOnly from './AdminNotShippedOnly';

class AdminOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { showAllOrders: false }
    }
    render() {
        return <div className='paddingTopBottomFifty container'>
            <Link to='admin' className="btn-floating btn-large waves-effect waves-light blue darken-2"><i className="material-icons">keyboard_arrow_left</i></Link>
            <h3 className="textWhite textCenter">Admin Orders</h3>
            <ul className='collection'>
                <li className='collection-item'>
                    <span>
                        <input type="checkbox" id="showAllOrNotShippedOrders" onChange={() => this.setState({ showAllOrders: !this.state.showAllOrders })} checked={!this.state.showAllOrders} />
                        <label htmlFor="showAllOrNotShippedOrders">Show not shipped orders only</label>
                    </span>
                </li>
                {this.state.showAllOrders ? <AdminAllOrders /> : <AdminNotShippedOnly />}
            </ul>
        </div>
    }
}

export default AdminOrders;