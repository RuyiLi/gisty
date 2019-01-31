import React from 'react';
import UserInput from './UserInput.js';
import Panel from './Panel.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gists: [],
            message: ''
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="title"> 
                    see <UserInput client={ this.props.client } query={ this.props.query } parent={ this }/>'s public gists
                </h1>
                <Panel parent={ this }/>
            </React.Fragment>
        )
    }
}