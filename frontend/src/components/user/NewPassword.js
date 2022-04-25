import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'


import Header from '../layout/Header'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'
import {useNavigate, useParams} from 'react-router-dom'

const NewPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword)
    let navigate = useNavigate()
    let {token} = useParams()

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Password updated successfully')
            navigate('/login')
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(token, formData))
    }

    return (
        <Fragment>
            <Header/>
            <MetaData title={'New Password Reset'} />

             <div className="col-md-3" style={{border:"1px solid #dcdcdc", margin:"auto", textAlign:"center",padding:"12px", paddingBottom:"10px", marginTop:"2%", boxShadow:"1px 1px 5px #dcdcdc", background:"white"}}>
                      <br/>
                     <img src="https://cdni.iconscout.com/illustration/premium/thumb/concept-of-reset-lost-password-in-mobile-1886567-1598238.png" style={{width:"60%"}}/>
                      
                      <h3>Reset Password</h3>
                        <br/>
                    <form onSubmit={submitHandler}>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn col-md-12"
                            style={{backgroundColor:"#33cabb", color:"white"}}>
                            Set Password
                        </button>

                    </form>
            </div>

        </Fragment>
    )
}

export default NewPassword
