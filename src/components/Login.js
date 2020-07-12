import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import { setToken } from '../token';
import {LOGIN_MUTATION} from "./UserMutations";
import Messages from "./Messages";
import {
    EuiPage,
    EuiPageBody,
    EuiButton,
    EuiPageContent,
    EuiFieldText,
    EuiFieldPassword,
    EuiForm,
    EuiFormRow,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
}
    from "@elastic/eui";


export default function Login(props)
{
    // Used to switch between login and signup
    const [isLogin] = React.useState(true);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState({});

    const [callLogin] = useMutation(
        LOGIN_MUTATION, {
            variables: {email, password}
        });


    const mutate = React.useCallback(() => {
        callLogin({ email, password })
            .then(({ data }) => {
                const token = data && data[isLogin ? 'login' : 'signup'].token;
                if (token) {
                    setToken(token);
                    props.history.push('/')
                } else {
                    setMessage({
                        type: 'danger',
                        text: 'Invalid email or password!'
                    });
                }
            });
    }, [callLogin, props.history, isLogin, email, password]);


    return (
        <EuiPage>
            <EuiPageBody>
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size="m">
                            <h1>Login</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    <EuiForm>
                        <EuiFormRow
                            label="Email*">
                            <EuiFieldText
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Your email"
                            />
                        </EuiFormRow>

                        <EuiFormRow
                            label="Password*">
                            <EuiFieldPassword
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Your password"
                            />
                        </EuiFormRow>
                        <br />
                        <Messages params = {
                            {
                                message: message,
                                setMessage: setMessage
                            }}
                        />
                        <EuiButton type="button" fill size="s"
                                   onClick={mutate}
                        >
                            Login
                        </EuiButton>
                    </EuiForm>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>

    )
}
