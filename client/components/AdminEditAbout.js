import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';
import firebase from 'firebase';

import AdminSuppDocForm from './AdminSuppDocForm';

import mutation from '../mutations/EditAbout';
import query from '../queries/about';

class AdminEditAbout extends Component {
    componentWillMount() {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
            hashHistory.push('admin')
        }
    }
    onSubmit({ heading, content }) {
        this.props.mutate({
            variables: { heading, content },
            refetchQueries: [{ query }]
        })
        .then(() => Materialize.toast('About page has been updated', 4000))
        .catch(res => {
            res.graphQLErrors.forEach(error => Materialize.toast(error.message, 4000));
        });
    }
    render() {
        const { about, loading } = this.props.data;
        const heading = about ? about.heading : '';
        const content = about ? about.content : '';
        if (loading) return <div />
        return <div className="container paddingTopBottomFifty">
            <div className="row">
                <Link to="/admin" className="waves-effect waves-light btn blue standardFlex col s6 m4 l2"><i className="material-icons">arrow_back</i> Back</Link>
            </div>
            <h3 className="textWhite center-align">Edit About Page</h3>
            <AdminSuppDocForm onSubmit={this.onSubmit.bind(this)} buttonName="edit about page" heading={heading} content={content} />
        </div>;
    }
}

export default graphql(query)(
    graphql(mutation)(AdminEditAbout)
);