import React, { Component } from 'react';

class AdminSupDocForm extends Component {
    constructor(props) {
        super(props);
        this.state = { heading: '', content: '' }
    }
    componentDidMount() {
        const { heading, content } = this.props;
        this.setState({ heading, content });
    }
    onSubmit(event) {
        event.preventDefault();
        if (this.state.heading.trim() && this.state.content.trim()) {
            this.props.onSubmit(this.state);
        } else {
            Materialize.toast('Input fields cannot be blank', 4000);
        }
    }
    render() {
        return <div className="row">
            <form className="col s12 m6 offset-m3 l4 offset-l4 adminSuppDocForm" onSubmit={this.onSubmit.bind(this)}>
                <div className="input-field">
                    <input
                        value={this.state.heading}
                        onChange={e => this.setState({heading: e.target.value})}
                        placeholder='Heading'
                    />
                </div>
                <div className="input-field">
                    <textarea
                        value={this.state.content}
                        onChange={e => this.setState({content: e.target.value})}
                        placeholder='Content'
                    ></textarea>
                </div>
                <button className="btn center-align col s12 l6 offset-l3">{this.props.buttonName || 'Submit'}</button>
            </form>
        </div>;
    }
}

export default AdminSupDocForm;