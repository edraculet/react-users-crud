import React  from 'react';
import { deleteToken } from '../token';

import {
    EuiButton,
    EuiText
} from '@elastic/eui';


export  default function Header({props}) {
    const [isLogin] = React.useState(true);
    return (
        <EuiText textAlign="right">
                {isLogin ? (
                    <EuiButton type="button" color="warning" fill size="s"
                        onClick={() => {
                            deleteToken();
                            props.history.push('/login');
                        }}
                    >
                        Logout
                    </EuiButton>
                ) :''}
        </EuiText>
    );

}
