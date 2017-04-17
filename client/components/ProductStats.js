import React, { Component } from 'react';

export default class extends Component {
    render() {
        return <section className="productStats textCenter">
            <ul>
                {this.props.stats.map(stat => {
                    if (stat) return <li key={stat}>{stat}</li>
                })}
            </ul>
        </section>;
    }
}
