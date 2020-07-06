import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import App from './components/App'
import * as serviceWorker from './serviceWorker';

// 1
import {ApolloProvider} from '@apollo/react-hooks'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

// 2
const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
});

// 3
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});
const NewContext = React.createContext();

ReactDOM.render(
    <ApolloProvider client={client}>
        <App client={client}  context={NewContext}/>

    </ApolloProvider>,
    document.getElementById('root')
);
serviceWorker.unregister();
