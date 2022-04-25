import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import Header from '../layout/Header'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../admin/Sidebar'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated, loading, user } = useSelector(state => state.user)
    const { user:authUser } = useSelector(state => state.auth)
    let navigate = useNavigate()

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        // console.log(isUpdated)

        if (isUpdated) {
            alert.success('Password updated successfully')
            navigate('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, isUpdated, loading, navigate, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />
            <Header/>
        <div className="row" style={{width:"100%"}}>
       {authUser&&authUser.role === "personnel"?<div className="col-12 col-md-2">
                    <Sidebar />
                </div>:<div className="col-md-1"></div>
            }
        
        <div className="col-12 col-md-10">
            <div className="row wrapper">
                <div className="shadow-lg wrapper my-5 col-md-4" style={{margin:"auto", backgroundColor:"white", boxShadow:"1px 1px 5px #9e9e9e", borderRadius:"15px", padding:"24px"}}>
                    <form onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" style={{backgroundColor:"#33cabb", color:"white"}} className="btn update-btn col-6 offset-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>
        </div>
        </div>




        </Fragment>
    )
}

export default UpdatePassword
