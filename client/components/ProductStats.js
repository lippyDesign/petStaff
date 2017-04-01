import React, { Component } from 'react';

export default class extends Component {
    render() {
        return <section className="productStats">
            <ul>
                {this.props.stats.map(stat => <li key={stat}>{stat}</li>)}
            </ul>
        </section>;
    }
}
