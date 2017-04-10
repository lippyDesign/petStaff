import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import  { Router, hashHistory, Route, IndexRoute } from 'react-router';

import './style/style.css';
import "react-image-gallery/styles/css/image-gallery.css";

import App from './components/App';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import AdminLogin from './components/AdminLogin';
import Admin from './components/Admin';
import AddProduct from './components/AddProduct';
import AdminProductList from './components/AdminProductList';
import CheckOut from './components/CheckOut';
import Contact from './components/Contact';
import OrderPlaced from './components/OrderPlaced';

import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="products" component={Products} />
          <Route path="cart" component={Cart} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
          <Route path="products/:id" component={ProductDetail} />
          <Route path="admin" component={Admin} />
          <Route path="addProduct" component={AddProduct} />
          <Route path="adminView" component={AdminProductList} />
          <Route path="checkout" component={CheckOut} />
          <Route path="contact" component={Contact} />
          <Route path="orderplaced" component={OrderPlaced} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
