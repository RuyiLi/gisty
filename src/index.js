import React from 'react';
import DOM from 'react-dom';
import { GraphQLClient } from 'graphql-request';
import './index.css';
import Main from './Main.js';

const API_ENDPOINT = 'https://api.github.com/graphql';
const OAUTH_ACCESS_TOKEN = '95291aeffac9bf51bf97583be58fb2dfad289a6a';

const query = `
    query($username:String!) {
        user(login: $username) {
            gists(first: 20, privacy: PUBLIC) {
                nodes {
                    name
                    description
                }
            }
        }
    }
`;

const client = new GraphQLClient(API_ENDPOINT, {
    headers: {
        Authorization: 'Bearer ' + OAUTH_ACCESS_TOKEN
    }
});

DOM.render(<Main client={ client } query={ query }/>, document.querySelector('#root'));