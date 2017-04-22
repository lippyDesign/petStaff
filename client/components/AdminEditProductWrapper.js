import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import firebase from 'firebase';

import fetchProduct from '../queries/fetchProduct';

import AdminEditProduct from './AdminEditProduct';

class AdminEditProductWrapper extends Component {
    // componentWillMount() {
    //     const { currentUser } = firebase.auth();
    //     if (!currentUser) {
    //         hashHistory.push('admin')
    //     }
    // }
    render() {
        console.log(this.props.data.product)
        if (!this.props.data.product) return <div/>
        return <AdminEditProduct product={this.props.data.product} />
    }
}

export default graphql(fetchProduct, {
    options: props => { return { variables: { id: props.params.id } } }
})(AdminEditProductWrapper);