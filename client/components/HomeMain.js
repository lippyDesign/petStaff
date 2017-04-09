import React, { Component } from 'react';

import banner from '../style/squareImgTwo.png'
class HomeMain extends Component {
    render() {
        return <section className="homeMain">
            <img src={banner} alt="pet supply company banner" className="responsive-img homePageImage" />
        </section>
    }
}

export default HomeMain;