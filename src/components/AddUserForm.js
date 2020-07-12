import React, {useState} from "react";
import {useMutation} from '@apollo/react-hooks';


import {EuiButton,
    EuiFieldText,
    EuiFormRow,
    EuiSelect,
    EuiSpacer,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
    EuiFlexGroup,
    EuiFlexItem,
   }
    from "@elastic/eui";
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
                    <EuiTitle size="s">
                        <h5>Add New User</h5>
                    </EuiTitle>
                </EuiPageHeaderSection>
            </EuiPageHeader>
            <hr/>
            <EuiSpacer/>
            <EuiFlexGroup>
                <EuiFlexItem style={{ maxWidth: 300 }}>
                    <EuiFormRow label="User name*">
                        <EuiFieldText name="name"
                                      value={name || ''}
                                      onChange={(e) => setName(e.target.value)}/>
                    </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem  style={{ maxWidth: 300 }}>
                    <EuiFormRow
                        label="Email*">
                        <EuiFieldText
                            name="email"
                            value={email || ''}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem  grow={false} style={{ width: 100 }}>
                    <EuiFormRow
                        label="Status*">
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
                </EuiFlexItem>

                <EuiFlexItem grow={false}>
                    <EuiFormRow hasEmptyLabelSpace display="center">
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
                                    type: 'danger',
                                    text: 'All fields are required!'
                                });
                            }
                        }}>
                            Save
                        </EuiButton>
                    </EuiFormRow>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer/>
            <hr/>

        </React.Fragment>
    );
}
