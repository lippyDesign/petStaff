import React, { Component } from 'react';
import firebase from 'firebase';

import Header from './Header';
import Footer from './Footer';

class App extends Component {
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
    render() {
        return <div className="site">
            <Header/>
            <main>
                {this.props.children}
            </main>
            <Footer />
        </div>;
    }
}

export default App;
