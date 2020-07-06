import React, {useState} from "react";
import {useMutation} from '@apollo/react-hooks';


import {EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiLink, EuiSelect, EuiSpacer, EuiText,EuiPageHeader, EuiPageHeaderSection, EuiTitle } from "@elastic/eui";
import {ADD_USER, GET_USERS} from "./UserMutations";

export default function AddUserForm({params}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(' ');
    const [createUser, {loading, error}] = useMutation(
        ADD_USER, {
            variables: {name, email, status},
            refetchQueries: () => [
                {
                    query: GET_USERS,
                    variables: params.variables
                },
            ],
        });
    const clearForm = () => {
        //reset form inputs
        setName('');
        setEmail('');
        setStatus('');
    };

    if (error) {
        console.log(error);
        return;
    }
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <React.Fragment>
            <EuiPageHeader>
                <EuiPageHeaderSection>
                    <EuiTitle>
                        <h3>Add User</h3>
                    </EuiTitle>
                </EuiPageHeaderSection>
            </EuiPageHeader>
            <hr/>
            <EuiForm>
                <EuiSpacer/>
                <EuiFormRow label="User name">
                    <EuiFieldText name="name"
                                  value={name || ''}
                                  onChange={(e) => setName(e.target.value)}/>
                </EuiFormRow>
                <EuiFormRow
                    label="Email" helpText="Add a unique email address">
                    <EuiFieldText
                        name="email"
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}/>
                </EuiFormRow>
                <EuiFormRow
                    label="Status"
                    labelAppend={
                        <EuiText size="xs">
                            <EuiLink>User status</EuiLink>
                        </EuiText>
                    }>
                    <EuiSelect
                        hasNoInitialSelection
                        name="status"
                        options={[
                            {value: ' ', text: 'Choose Option'},
                            {value: 'Active', text: 'Active'},
                            {value: 'Inactive', text: 'Inactive'},
                        ]}
                        value={status || ' '}
                        onChange={(e) => setStatus(e.target.value)}/>
                </EuiFormRow>
                <EuiSpacer/>

                <EuiButton type="button" onClick={e => {
                    e.preventDefault();
                    if (name !== '' && email !== '' && status !== ' ') {
                        params.resetPageFields();
                        createUser()
                            .then((response) => {
                                // update global message notification
                                params.setMessage({
                                    type: 'success',
                                    text: 'User added!'
                                });
                                clearForm();
                                return;
                            });
                    } else {
                        params.setMessage({
                            type: 'error',
                            text: 'All fields are required!'
                        });
                    }
                }}>
                    Add User
                </EuiButton>
                <EuiSpacer/>
            </EuiForm>
            <hr/>
        </React.Fragment>
    );
}
