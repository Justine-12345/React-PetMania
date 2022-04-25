import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'

import {useNavigate, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/layout/Header'
import { confirmAlert } from 'react-confirm-alert';

const UsersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    let navigate = useNavigate()
    let {filterRole} = useParams();


    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, navigate])

    const deleteUserHandler = (id) => {

         confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>You want to delete this user?</p>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                    dispatch(deleteUser(id))
                    onClose();
                  }}
                >
                  Yes, Delete it!
                </button>
              </div>
            );
          }
        });

       
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            
            if(filterRole){
                if(user.role === filterRole){

                    data.rows.push({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,

                        actions: <Fragment>
                            <Link to={`/user/${user._id}`} className="btn btn-success py-1 px-2">
                                <FontAwesomeIcon icon={faEye}/>
                            </Link>
                            &nbsp;
                            <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    })
                }

            }
            else{

                data.rows.push({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,

                    actions: <Fragment>
                        <Link to={`/user/${user._id}`} className="btn btn-success py-1 px-2">
                                <FontAwesomeIcon icon={faEye}/>
                        </Link>
                        &nbsp;      
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                })

            }


        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <Header/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Users</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UsersList
