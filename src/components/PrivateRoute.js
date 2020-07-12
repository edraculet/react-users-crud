import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../token'

export const PrivateRoute = ({ component: Component, ...rest }) =>
{
    const isLoggedIn = !!getToken();
    return (

    <Route {...rest} render={props => (
        isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)};
