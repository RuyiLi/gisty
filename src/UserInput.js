import React from 'react';

const messages = {
    notFound: 'couldn\'t find that user :(',
    noGists: 'that user has no public gists :/',
    okay: 'showing latest 20 gists'
}

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            style: {
                width: '10.8rem'
            }
        }

        this.timeout = null;

        this.handleChange = this.handleChange.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
    }

    async fetchInfo() {
        try {
            const { username } = this.state;
            const data = await this.props.client.request(this.props.query, { username });
            if(this.state.username !== username) return; // Handle overwrites
            this.props.parent.setState(() => {
                const { nodes } = data.user.gists;
                return { 
                    gists: nodes,
                    message: nodes.length ? messages.okay : messages.noGists
                };
            })
        } catch(err) {
            // console.error(err.stack);
            this.props.parent.setState(() => {
                return { 
                    gists: [], 
                    message: messages.notFound 
                };
            })
        }
    }

    handleChange(e) {
        // e.persist();
        const username = e.target.value;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.fetchInfo, 200);
        this.setState(() => {
            return { 
                username,  
                style: {
                    width: `${Math.max(username.length, 6) * 1.8}rem`
                }
            };
        })
    }

    /*
    componentDidMount() {
        console.log('Test 1');
    }
    */

    render() {
        return (
            <form target="_blank">
                <input type="text" placeholder="RuyiLi" onChange={ this.handleChange } style={ this.state.style }autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
            </form>
        )
    }
}