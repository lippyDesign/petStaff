import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchProductsAdmin';
import mutation from '../mutations/DeleteProduct';

class AdminProductList extends Component {
    onProductDelete(id) {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch());
    }
    renderProducts() {
        return this.props.data.products.map(({ title, id }) => {
            return <li key={id} className='collection-item adminProductView'>
                <Link to={`productsedit/${id}`}>{title}</Link>
                <i onClick={() => this.onProductDelete(id)} className='material-icons adminDeleteProductIcon'>delete</i>
            </li>
        });
    }
    render() {
        if (this.props.data.loading) return <div className="container">Loading</div>;
        if (!this.props.data.loading && this.props.data.products) {
            return <div className="container">
                <ul className='collection with-header'>
                    <li className="collection-header adminProductViewHeading"><h5>Products</h5></li>
                    {this.renderProducts()}
                </ul>
            </div>;
        }
        return <div />;
    }
}

export default graphql(mutation)(
    graphql(query)(AdminProductList)
);