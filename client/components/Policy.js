import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/policy';

class Policy extends Component {
    render() {
        const { heading, content, loading } = this.props.data;
        if (loading) return <div />;
        return <div className="row container textCenter">
            <h3 className="textWhite">{heading}</h3>
            <p className="policySection">{content}</p>
        </div>;
    }
}

export default graphql(query)(Policy);