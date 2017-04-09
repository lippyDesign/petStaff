import React from 'react';
import { Link } from 'react-router';

export default () => <footer className="page-footer grey darken-4">
    <div className="container">
        <div className="row">
            <div className="col l6 s12">
                <h5 className="white-text">Footer Content</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            </div>
            <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                    <li><Link className="grey-text text-lighten-3" to="contact">Contact Us</Link></li>
                </ul>
            </div>
        </div>
    </div>
    <div className="footer-copyright black">
        <div className="container">
            LOGO © 2017 Company Name Inc. All rights reserved.
            <a target="_blank" className="grey-text text-lighten-4 right" href="https://github.com/lippyDesign">Created by LippyDesign</a>
        </div>
    </div>
</footer>;
