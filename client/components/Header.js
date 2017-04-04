import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNavVisible: false
        }
    }
    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{ query }]
        });
        this.setState({ sideNavVisible: false});
    }
    renderBigNav() {
        const { loading, user } = this.props.data;
        if (loading) return <div />;
        if (user) {
            return <ul className="right hide-on-med-and-down">
                <li><Link to="/" className="navi-link">Home</Link></li>
                <li><Link to="/products" className="navi-link">Products</Link></li>
                <li><Link to="/dashboard" className="navi-link">Account</Link></li>
                <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
                <li><Link to="/cart" className="navi-link"><i className="material-icons">shopping_cart</i> Cart: {this.props.cartTotalItems}</Link></li>
            </ul>;
        }
        return <ul className="right hide-on-med-and-down">
            <li><Link to="/" className="navi-link">Home</Link></li>
            <li><Link to="/products" className="navi-link">Products</Link></li>
            <li><Link to="/signup" className="navi-link">Sign Up</Link></li>
            <li><Link to="/login" className="navi-link">Log In</Link></li>
            <li><Link to="/cart" className="navi-link"><i className="material-icons">shopping_cart</i> Cart: {this.props.cartTotalItems}</Link></li>
        </ul>
    }
    toggleSidebar() {
        this.setState({ sideNavVisible: !this.state.sideNavVisible })
    }
    renderSmallNav() {
        const { sideNavVisible } = this.state;
        const { loading, user } = this.props.data;
        if (loading) return <div />;
        if (user) {
            return <div className="hide-on-large-only right">
                <ul id="slide-out" className={`sideNav ${sideNavVisible ? 'sideBarVisible' : ''}`}>
                    <li><Link to="/" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link">Home</Link></li>
                    <li><Link to="/products" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link">Products</Link></li>
                    <li><div className="divider"></div></li>
                    <li><Link to="/dashboard" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link">Account</Link></li>
                    <li><a className='textCenter' onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
                    <li><div className="divider"></div></li>
                    <li><Link to="/cart" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link"><i className="material-icons">shopping_cart</i> Cart: {this.props.cartTotalItems}</Link></li>
                </ul>
                <a onClick={this.toggleSidebar.bind(this)} data-activates="slide-out" className="button-collapse cursorPointer"><i className="material-icons">menu</i></a>
                <div className={sideNavVisible ? '' : 'displayNone'} id="sidenav-overlay" onClick={this.toggleSidebar.bind(this)}></div>
            </div>;
        }
        return <div className="hide-on-large-only right">
            <ul id="slide-out" className={`sideNav ${sideNavVisible ? 'sideBarVisible' : ''}`}>
                <li><Link to="/" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link">Home</Link></li>
                <li><Link to="/products" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link">Products</Link></li>
                <li><div className="divider"></div></li>
                <li><Link to="/signup" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link">Sign Up</Link></li>
                <li><Link to="/login" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link">Log In</Link></li>
                <li><div className="divider"></div></li>
                <li><Link to="/cart" onClick={() => this.setState({ sideNavVisible: false })} className="navi-link"><i className="material-icons">shopping_cart</i> Cart: {this.props.cartTotalItems}</Link></li>
            </ul>
            <a onClick={this.toggleSidebar.bind(this)} data-activates="slide-out" className="button-collapse cursorPointer"><i className="material-icons">menu</i></a>
            <div className={sideNavVisible ? '' : 'displayNone'} id="sidenav-overlay" onClick={this.toggleSidebar.bind(this)}></div>
        </div>;
    }
    render() {
        return <nav>
            <div className="nav-wrapper">
                <Link className="brand-logo" to="/">Logo</Link>
                {this.renderBigNav()}
                {this.renderSmallNav()}
            </div>
        </nav>;
    }
}

export default graphql(mutation)(
    graphql(query)(Header)
);
