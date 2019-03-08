import React from 'react';

export default class Gist extends React.Component {
    render() {
        return (
            <div className="box" onClick={ () => window.open(`https://gist.github.com/${this.props.name}`, '_blank') }>
                <h1 style={ { fontSize: '1.3rem' } }> { this.props.name } </h1>
                <h2 style={ { fontSize: '1rem' } }> { this.props.description } </h2>
            </div>
        )
    }
}