import React from 'react';
import Gist from './Gist.js';

export default class Panel extends React.Component {
    render() {
        const gists = this.props.parent.state.gists.map(g => 
            <Gist name={ g.name } description={ g.description }/>
        )
        return (
            <React.Fragment>
                <h2 className="message"> { this.props.parent.state.message } </h2>
                <hr/>
                { gists }
            </React.Fragment>
        )
    }
}