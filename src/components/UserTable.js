import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_USERS, DELETE_USER} from "./UserMutations";
import AddUserForm from "./AddUserForm";
import Messages from "./Messages";
import Pagination from "./Pagination";
import {
    EuiBasicTable,
    EuiLink,
    EuiHealth,
    EuiSpacer,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormLabel,
    EuiSelect
} from '@elastic/eui';
import UserEdit from "./UserEdit";

export default function UserTable() {

    // pagination fields
    const [pageIndex, setPageIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [message, setMessage] = useState({});

    // sorting fields
    const [sortField, setSortField] = useState('NAME');
    const [sortDirection, setSortDirection] = useState('ASC');

    const variables = {
        first: parseInt(itemsPerPage),
        offset: parseInt(pageIndex),
        orderBy: sortField + '_' + sortDirection
    };
    // run all users  query
    const {loading, error, data} = useQuery(GET_USERS,
        {
            variables: variables

        });

    // delete an user
    const [onDeleteHandler, {deleting, error_deleting}] = useMutation(
        DELETE_USER, {
            refetchQueries: () => [
                {
                    query: GET_USERS,
                    variables: variables
                },
            ],
        });
    // set user variables from state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(' ');
    const [editUser, setEditID] = useState(null);

    // check data is loaded
    if (loading || error) {
        return 'Loading...';
    }
    const resetPageFields = () => {
        setCurrentPage(1);
        setPageIndex(0);
    };
    // trigger actions on table change
    const onTableChange = ({page = {}, sort = {}}) => {
        const {field: sortField} = sort;
        const direction = (sortDirection === 'ASC') ? 'DESC' : 'ASC';
        setSortField(sortField.toUpperCase());
        setSortDirection(direction);
        resetPageFields();
    };

    // args for creating pagination
    const paginationArgs = {
        itemsLength: data.allUsers.length,
        pageIndex: pageIndex,
        setPageIndex: setPageIndex,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        itemsPerPage: itemsPerPage,
        pageInfo: data.allUsers.pageInfo
    };
    // args for sorting the table
    const sorting = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
    };
    // building table columns
    const columns = [
        {
            field: 'name',
            name: 'Name',
            sortable: true,
            'data-test-subj': 'nameCell',
        },
        {
           field: 'email',
            name: 'Email',
            render: email => (
                <EuiLink href="mailto:{email}" target="_blank">
                    {email}
                </EuiLink>
            ),
        },
        {
            field: 'status',
            name: 'Status',
            truncateText: true,
            sortable: true,
            render: status => {
                const color = (status === 'Active') ? 'success' : 'danger';
                const label = (status === 'Active') ? 'Active' : 'Inactive';
                return <EuiHealth color={color}>{label}</EuiHealth>;
            }
        },
        {
            field: 'id',
            name: 'Actions',
            render: (id, user) => (
                // update user button
                <EuiFlexGroup>
                    <button
                            className="euiButton euiButton--secondary"
                            onClick={(event) => {
                                setEditID(user.id);
                                setName(user.name);
                                setEmail(user.email);
                                setStatus(user.status);
                                window.scrollTo(0,0);
                            }}>
                        Edit
                    </button>
                    &nbsp; &nbsp; &nbsp;

                    {/*delete user button*/}
                    <button type="button"  className="euiButton euiButton--danger danger"
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete '+ user.name + '"?')) {
                                        onDeleteHandler({variables: {id: user.id}}).then((response) => {
                                            // update global message notification
                                            setMessage({
                                                type: 'success',
                                                text: 'User deleted!'
                                            });
                                            return id;
                                        });
                                }
                            }}

                            color="danger">
                        Delete
                    </button>
                </EuiFlexGroup>
            )
        },
    ];
    if (deleting) return <h3>Deleting...</h3>
    if (error_deleting) {
        console.log(error);
        return;
    }

    // add custom class to table rows
    const getRowProps = item => {
        return {
            className: 'userRowClass',
        };
    };

    // args for editing an user
    const args = {
        setEditID: setEditID,
        setName: setName,
        setEmail: setEmail,
        setStatus: setStatus,
        id: editUser,
        name: name,
        email: email,
        status: status,
        setMessage:setMessage
    };

    // setting variables for pagination
    const pageSizeOptions = [3, 5, 8];
    const pageOptions = pageSizeOptions.map(function (item) {
        return {value: item, text: item};
    });
    const changePerPage = (e) => {
        setItemsPerPage(e.target.value);
        resetPageFields();
    };
    return (
        <React.Fragment>
            {
                editUser
                    ?
                    <UserEdit params={args}/>
                    :
                    <AddUserForm params={
                        {
                            variables: variables,
                            resetPageFields: resetPageFields,
                            setMessage:setMessage
                        }
                    }/>
            }
            <Messages params = {
                {
                    message: message,
                    setMessage:setMessage
                }}
            />
            <EuiSpacer size="xl"/>
            <EuiFlexItem>
                <EuiFormLabel htmlFor="textField19">
                    Rows Per page
                    <EuiSelect
                        id="selectPageNumber"
                        options={pageOptions}
                        value={itemsPerPage}
                        onChange={changePerPage}
                        aria-label="Use aria labels when no actual label is in use"
                    />
                </EuiFormLabel>
            </EuiFlexItem>

            <EuiSpacer size="xl"/>
            <EuiBasicTable
                items={data.allUsers.nodes || []}
                columns={columns}
                tableLayout={'fixed'}
                sorting={sorting}
                onChange={onTableChange}
                rowProps={getRowProps}
            />
            <Pagination pagination={paginationArgs}/>
        </React.Fragment>
    );
}
