import React, { Component } from 'react';
import firebase from 'firebase';

import Header from './Header';
import Footer from './Footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { cart: [] }
    }
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyAVZLEXbWmgu-2qnyLmqH3MoKPlDZ8hlek",
            authDomain: "petclothes-c14c6.firebaseapp.com",
            databaseURL: "https://petclothes-c14c6.firebaseio.com",
            storageBucket: "petclothes-c14c6.appspot.com",
            messagingSenderId: "726354445820"
        };
        firebase.initializeApp(config);
    }
    addToCart(item) {
        this.setState({ cart: [...this.state.cart, item] })
    }
    countCartItems() {
        return this.state.cart.length;
    }
    render() {
        return <div className="site">
            <Header cartTotalItems={this.countCartItems()}/>
            <main>
                {React.cloneElement(this.props.children, { cart: this.state.cart, addToCart: this.addToCart.bind(this) })}
            </main>
            <Footer />
        </div>;
    }
}

export default App;
