import React from 'react';
import { Link } from 'react-router';

const companyName = 'Whiskers & Paws Co.'

export default () => <footer className="page-footer grey darken-4">
    <div className="container">
        <div className="row">
            <div className="col l6 s12">
                <h5 className="white-text">{companyName}</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                <p className="grey-text text-lighten-4"><a target="_blank" href="https://www.facebook.com">Check us out on Facebook</a></p>
            </div>
            <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Important Links</h5>
                <ul>
                    <li><Link className="grey-text text-lighten-3" to="policy">Policy</Link></li>
                    <li><Link className="grey-text text-lighten-3" to="shippingandreturns">Shipping and Returns</Link></li>
                    <li><Link className="grey-text text-lighten-3" to="about">About</Link></li>
                    <li><Link className="grey-text text-lighten-3" to="contact">Contact Us</Link></li>
                </ul>
            </div>
        </div>
    </div>
    <div className="footer-copyright black">
        <div className="container">
            LOGO © 2017 {companyName} All rights reserved.
            <a target="_blank" className="grey-text text-lighten-4 right" href="https://github.com/lippyDesign">Created by LippyDesign</a>
        </div>
    </div>
</footer>;
