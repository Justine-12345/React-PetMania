import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import Header from '../layout/Header'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message)
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
         <Header/>
            <MetaData title={'Forgot Password'} />

             <div className="col-md-3" style={{border:"1px solid #dcdcdc", margin:"auto", textAlign:"center",padding:"12px", paddingBottom:"10px", marginTop:"2%", boxShadow:"1px 1px 5px #dcdcdc", background:"white"}}>
                      <br/>
                     <img src="https://media.istockphoto.com/vectors/man-forgot-the-password-concept-of-forgotten-password-key-account-vector-id1306827906?k=20&m=1306827906&s=612x612&w=0&h=pQBbTdryITE9Dok1NNlF3N1KnbisjDbPXTDKzbOzs1o=" style={{width:"60%"}}/>
                      
                      <h3>Forgot Password</h3>
                        <br/>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn col-md-12"
                            style={{backgroundColor:"#33cabb", color:"white"}}
                            disabled={loading ? true : false} >
                            Send Email
                    </button>

                    </form>
                </div>
        </Fragment>
    )
}

export default ForgotPassword
