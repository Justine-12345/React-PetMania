import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import Header from '../layout/Header'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, googlelogin, facebooklogin, loadUser, clearErrors } from '../../actions/userActions'
import {useNavigate} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);

    let navigate = useNavigate()

    useEffect(() => {

            // console.log("pumunta dito")
            if (isAuthenticated || localStorage.getItem("isAuthenticated")) {
                // console.log("user",user.role)

                if(user.role === "personnel"){
                    navigate("/admin/dashboard")
                }else{
                    navigate("/") 
                }

            }

            if(isAuthenticated){
                alert.success("Your Are Already Login");  
            }
            
       

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        console.log(user)

    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }


    const responseSuccessGoogle = (response) => {

        dispatch(googlelogin(response))

    }

    const responseErrorGoogle = (response) => {
        console.log(response)
    }


     const responseFacebook = (response) => {
        dispatch(facebooklogin(response))
    }

    return (
        <Fragment>
         <Header/>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="col-md-3" style={{border:"1px solid #dcdcdc", margin:"auto", textAlign:"center",padding:"12px", paddingBottom:"10px", marginTop:"2%", boxShadow:"1px 1px 5px #dcdcdc", background:"white"}}>
                      <br/>
                     <img src="https://cdn.dribbble.com/users/4901419/screenshots/10296398/pet_care_pet_care__4x.jpg" style={{width:"50%"}}/>
                      
                      <h3>Welcome to <img src="https://res.cloudinary.com/dpvofuwy8/image/upload/v1649264276/assets/logo_lbforh.png" style={{width:"40%", position:"relative", bottom:"4px"}}/> login to continue</h3>
                     
                            <form  onSubmit={submitHandler}>
                               
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

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




                                
                                
                                <small><Link to="/password/forgot" style={{textAlign:"center"}}>Forgot Password?</Link></small>

                                <button
                                    id="login_button"
                                    type="submit"
                                     className="btn col-md-12"
                                     style={{backgroundColor:"#33cabb", color:"white"}}
                                >
                                    <b>LOGIN</b>
                                </button>
                                <br/>

                                <div className="row">
                                    <div className="col-md-6">
                                     <GoogleLogin
                                        clientId="101367040621-btgoj7nqib3bps5592vv9ng9l43ld88k.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={responseSuccessGoogle}
                                        onFailure={responseErrorGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        isSignedIn={false}
                                        render={renderProps => (
                                             <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled} style={{fontSize:"15px"}} class="google btn fg"><i class="fa fa-google fa-fw">
                                                  </i> Login with Google+
                                             </a>
                                            )}
                                      />
                                  </div>

                                  <div className="col-md-6">
                                   <FacebookLogin
                                    appId="7257568197648637"
                                    autoLoad={false}
                                    callback={responseFacebook} 
                                     render={renderProps => (
                                       <a href="#" onClick={renderProps.onClick} class="fb btn fg" style={{fontSize:"15px"}}>
                                          <i class="fa fa-facebook fa-fw"></i> Login with Facebook
                                      </a>
                                      )}
                                    />
                                  </div>
                                </div>

                               
                                <small>Don't have an account?<Link to="/register"> Create Account</Link></small>
                            </form>
                        </div>
                


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
