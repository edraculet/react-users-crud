import React from 'react'
import UserTable from './UserTable'

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
                            <h1>Users List</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    <UserTable/>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    )
}


