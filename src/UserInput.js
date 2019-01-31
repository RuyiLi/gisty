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

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // e.persist();
        const username = e.target.value;
        this.setState(() => {
            return { 
                username,  
                style: {
                    width: `${Math.max(username.length, 6) * 1.8}rem`
                }
            };
        }, async () => {
            console.log(this.state);
            try {
                const data = await this.props.client.request(this.props.query, { username: this.state.username });
                this.props.parent.setState(() => {
                    const { nodes } = data.user.gists;
                    return { 
                        gists: nodes,
                        message: nodes.length ? messages.okay : messages.noGists
                    };
                }, () => {
                    console.log(data);
                })
            } catch(err) {
                console.error(err.stack);
                this.props.parent.setState(() => {
                    return { 
                        gists: [], 
                        message: messages.notFound 
                    };
                })
            }
        })
    }

    componentDidMount() {
        console.log('Test 1');
    }

    render() {
        return (
            <form target="_blank">
                <input type="text" placeholder="RuyiLi" onChange={ this.handleChange } style={ this.state.style }autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
            </form>
        )
    }
}