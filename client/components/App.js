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
        const alreadyExists = this.state.cart.find(({ id, size, color }) => {
            return (id === item.id && size === item.size && color === item.color);
        })
        if (alreadyExists) {
            const q = alreadyExists.quantity;
            const newQ = q++;
            const array = this.state.cart;
            const index = array.indexOf(alreadyExists);
            array[index].quantity++;
            this.setState({ cart: array });
        } else {
            item.quantity = 1;
            this.setState({ cart: [...this.state.cart, item] })
        }
        
    }
    increaseByOne(item) {
        const array = this.state.cart;
        const index = array.indexOf(item);
        array[index].quantity++;
        this.setState({ cart: array });
    }
    decreaseByOne(item) {
        const array = this.state.cart;
        const index = array.indexOf(item);
        array[index].quantity--;
        if (array[index].quantity <= 0) {
            array.splice(index, 1);
        }
        this.setState({ cart: array });
    }
    removeFromCart(item) {
        const array = this.state.cart;
        const index = array.indexOf(item);
        array.splice(index, 1);
        this.setState({ cart: array });
    }
    countCartItems() {
        return this.state.cart.reduce((prev, curr) => {
            return prev + curr.quantity;
        }, 0);
    }
    render() {
        return <div className="site">
            <Header cartTotalItems={this.countCartItems()}/>
            <main>
                {React.cloneElement(this.props.children,
                    {
                        cart: this.state.cart,
                        addToCart: this.addToCart.bind(this),
                        increaseByOne: this.increaseByOne.bind(this),
                        decreaseByOne: this.decreaseByOne.bind(this),
                        removeFromCart: this.removeFromCart.bind(this)
                    }
                )}
            </main>
            <Footer />
        </div>;
    }
}

export default App;
