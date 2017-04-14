import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import mutation from '../mutations/UpdateSearchText';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = { searchItems: [] }
    }
    onSearchTextChaange(e) {
        this.props.updateSearchText(e.target.value)
        if (!e.target.value.length) {
            this.setState({ searchItems: [] });
        } else {
            this.props.mutate({
                variables : { searchText: e.target.value.trim() }
            })
            .then(products => {
                this.setState({ searchItems: products.data.updateSearchText })
            })
        }
    }
    renderSuggestionList() {
        return <ul className='collection search-form-list container'>
                {this.state.searchItems.map(({ id, title }) => <li onClick={() => hashHistory.push(`/products/${id}`)} className='collection-item' key={id}>{title}</li>)}
            </ul>
    }
    render() {
        return <div>
            <form className='search-form'>
                <i className="material-icons searchIcon">search</i>
                <input
                    placeholder='Search Products'
                    value={this.props.searchText}
                    onChange={this.onSearchTextChaange.bind(this)}
                />
            </form>
            {this.state.searchItems.length ? this.renderSuggestionList() : ''}
        </div>
    }
}

export default graphql(mutation)(SearchForm);