import React from 'react'
import UserTable from './UserTable';
import Login from './Login';
import {  Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { history } from '../_helpers';

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
} from '@elastic/eui';

require("@elastic/eui/dist/eui_theme_light.css");

export  default function App(){
    return (
        <EuiPage>
            <EuiPageBody>
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size="l">
                            <h1>Users Management</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={UserTable} />
                            <Route path="/login" component={Login} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    )
}


