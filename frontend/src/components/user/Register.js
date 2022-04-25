import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import Header from '../layout/Header'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register,loadUser, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        age:'',
        address:'',
        contact:'',
        gender:'',
        password: ''
    })

    const { name, email, age, address, contact, gender, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    let navigate = useNavigate();

    useEffect(() => {


        if (isAuthenticated || localStorage.getItem("isAuthenticated")) {
               navigate("/")
               alert.success("Your Are Already Login");      
            }
            
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('age', age);
        formData.set('address', address);
        formData.set('contact', contact);
        formData.set('gender', gender);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            <Header/>
            <MetaData title={'Register User'} />
                <div className="col-md-5" style={{border:"1px solid #dcdcdc", margin:"auto", textAlign:"center",padding:"12px", paddingBottom:"10px", marginTop:"2%", boxShadow:"1px 1px 5px #dcdcdc", background:"white"}}>
                      <br/>
                     <img src="https://media.istockphoto.com/vectors/pet-services-pets-care-services-pet-shop-tiny-people-and-pets-concept-vector-id1200533441?k=20&m=1200533441&s=170667a&w=0&h=jpw3KGV6g-2J6eiwW5bHdS-0Vuzas8qUW8WixhTgZd0=" style={{width:"40%"}}/>
                      <br/> <br/>
                      <h3>Welcome to <img src="https://res.cloudinary.com/dpvofuwy8/image/upload/v1649264276/assets/logo_lbforh.png" style={{width:"30%", position:"relative", bottom:"4px"}}/> register to continue</h3>
                     
                    <form onSubmit={submitHandler} encType='multipart/form-data' style={{textAlign:"left"}}>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="age_field">Age</label>
                                    <input
                                        type="number"
                                        id="age_field"
                                        className="form-control"
                                        name='age'
                                        defaultValue={age}
                                        onChange={onChange}
                                    />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="address_field">Address</label>
                                    <input
                                        type="text"
                                        id="address_field"
                                        className="form-control"
                                        name='address'
                                        value={address}
                                        onChange={onChange}
                                    />
                        </div>


                         <div className="form-group">
                                    <label htmlFor="contact_field">Contact No.</label>
                                    <input
                                        type="text"
                                        id="contact_field"
                                        className="form-control"
                                        name='contact'
                                        value={contact}
                                        onChange={onChange}
                                    />
                        </div>

                        <br/>

                        <div className="form-group">
                                    <label htmlFor="gender_field">Gender</label>
                                    <br/>
                                    <input
                                        type="radio"
                                        id="gender_field"
                                        name="gender"
                                        value="male"
                                        checked={gender === "male"? true:""}
                                        onChange={onChange}
                                    /> Male &nbsp;&nbsp;
                                    <input
                                        type="radio"
                                        id="gender_field1"
                                        name="gender"
                                        value="female"
                                        checked={gender === "female"? true:""}
                                        onChange={onChange}
                                    /> Female
                        </div>

                        <br/>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                            style={{width:"100px", position:"relative", top:"10px"}}
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <br/>
                        <hr/>
                        <br/>

                         <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <br/>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn col-md-12"
                            style={{backgroundColor:"#33cabb", color:"white"}}
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                    <br/>
                </div>
                <br/>
                <br/>

        </Fragment>
    )
}

export default Register
