import React from "react";
import {useMutation} from '@apollo/react-hooks';
import {EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiLink, EuiSelect, EuiSpacer, EuiText,EuiPageHeader, EuiPageHeaderSection, EuiTitle } from "@elastic/eui";
import {EDIT_USER, GET_USERS} from "./UserMutations";

export default function UserEdit({params}) {

    const id = params.id || null;
    const name = params.name || '';
    const email = params.email || '';
    const status = params.status || '';
    const [updateUser, {loading, error}] = useMutation(
        EDIT_USER, {
            variables: {id, name, email, status},
            refetchQueries: () => [
                {query: GET_USERS},
            ],
        });
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
                        <h3><strong>Edit #{name}</strong></h3>
                    </EuiTitle>
                </EuiPageHeaderSection>
            </EuiPageHeader>
            <hr/>
            <EuiForm>
                <EuiFieldText name="id"
                              value={id || ''}
                              readOnly
                              hidden
                />


                <EuiFormRow label="User name">
                    <EuiFieldText name="name"
                                  value={params.name || ''}
                                  onChange={(e) => params.setName(e.target.value)}/>
                </EuiFormRow>

                <EuiFormRow
                    label="Email*">
                    <EuiFieldText
                        name="email"
                        value={params.email || ''}
                        onChange={(e) => params.setEmail(e.target.value)}/>
                </EuiFormRow>
                <EuiFormRow
                    label="Status"
                    labelAppend={
                        <EuiText size="xs">
                            User status
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
                        value={params.status || ' '}
                        onChange={(e) => params.setStatus(e.target.value)}/>
                </EuiFormRow>
                <EuiSpacer/>

                <EuiButton type="button" fill onClick={e => {
                    e.preventDefault();
                    if (params.name !== '' && params.email !== '' && params.status !== ' ') {
                        updateUser()
                            .then((response) => {
                                // update global message notification
                                params.setMessage({
                                    type: 'success',
                                    text: 'User updated!'
                                });
                                params.setEditID(null);
                                return;
                            });
                    } else {
                        params.setMessage({
                            type: 'danger',
                            text: 'All fields are required!'
                        });
                    }
                }}>
                    Update User
                </EuiButton>
                <EuiSpacer/>
                <EuiText size="s">
                    <EuiLink onClick={e => {
                        e.preventDefault();
                        params.setEditID(null);
                    }}>Cancel</EuiLink>
                </EuiText>

                <EuiSpacer/>
            </EuiForm>
            <hr/>
        </React.Fragment>

    );
}
