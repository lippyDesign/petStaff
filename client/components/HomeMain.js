import React, { Component } from 'react';

import banner from '../style/rrr.png'
class HomeMain extends Component {
    render() {
        return <section className="homeMain container">
            <img src={banner} alt="pet supply company banner" className="responsive-img homeImg" />
        </section>
    }
}

export default HomeMain;