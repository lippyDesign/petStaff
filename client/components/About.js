import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/about';

class About extends Component {
    render() {
        const { about, loading } = this.props.data;
        if (loading) return <div />;
        return <div className="row container textCenter">
            <h3 className="textWhite">{about ? about.heading : ''}</h3>
            <p className="aboutSection">{about ? about.content : ''}</p>
        </div>;
    }
}

export default graphql(query)(About);