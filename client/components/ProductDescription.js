import React, { Component } from 'react';

export default class extends Component {
    render() {
        return <section className="productDescription">
            <p>{this.props.description}</p>
        </section>;
    }
}
