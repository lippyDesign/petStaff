import React, { Component } from 'react';

export default class extends Component {
    render() {
        return <form className='search-form'>
            <i className="material-icons searchIcon">search</i>
            <input placeholder='Search Products' />
        </form>;
    }
}