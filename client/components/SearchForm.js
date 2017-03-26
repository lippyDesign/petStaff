import React, { Component } from 'react';

export default class extends Component {
    render() {
        return <form className='search-form col s12 m6 offset-m3'>
            <i className="material-icons searchIcon">search</i>
            <input placeholder='Search Products' />
        </form>;
    }
}