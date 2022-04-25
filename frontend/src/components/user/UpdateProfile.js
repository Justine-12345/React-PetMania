import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import Header from '../layout/Header'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile,loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET,  USER_DETAILS_RESET} from '../../constants/userConstants'
import {useNavigate, useParams} from 'react-router-dom'
import Sidebar from '../admin/Sidebar'

const UpdateUser = () => {
    const [user, setUser] = useState()
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')

    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [roleDesc, setRoleDesc] = useState('')

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')


    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated, loading, user:updatedUser} = useSelector(state => state.user);
    const { user:currentUser } = useSelector(state => state.auth)

    let navigate = useNavigate();

    const roles = [
         'user',
         'adopter',
         'personnel',
         'deactive'
    ]

    useEffect(() => {
        
        if(updatedUser){
            setUser(updatedUser)
        }else if(currentUser){
            setUser(currentUser)
        }


        // if (user) {
        //     dispatch(loadUser())
        // } else {
        if (user){
            setName(user.name);
            setEmail(user.email);
            setAge(user.age);
            setGender(user.gender);
            setAddress(user.address);
            setContact(user.contact);
            setRoleDesc(user.roleDesc);
            setRole(user.role);
            setAvatarPreview(user.avatar&&user.avatar.url);

        }
        // }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            dispatch({type: UPDATE_USER_RESET})
            dispatch({ type: USER_DETAILS_RESET })
            navigate(`/user/${user._id}`)
            alert.success('User updated successfully')
        }

    }, [dispatch, alert, error, navigate, isUpdated, navigate, user, updatedUser])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('age', age);
        formData.set('gender', gender);
        formData.set('address', address);
        formData.set('contact', contact);
        formData.set('roleDesc', roleDesc);
        formData.set('role', role);
        formData.set('avatar', avatar);
        dispatch(updateProfile( formData))
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <Header/>
            <div className="row">
            {user&&user.role === "personnel"?<div className="col-12 col-md-2">
                    <Sidebar />
                </div>:
                <div className="col-md-1"></div>
            }

            <div className="col-12 col-md-10">
            <div className="row">
                <div>
                    <div className="row wrapper">
                        <div className="shadow-lg mt-5 wrapper col-md-8" style={{margin:"auto", backgroundColor:"white", boxShadow:"1px 1px 5px #9e9e9e", borderRadius:"15px", padding:"24px"}}>
                            <form onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>


                                        
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarPreview}
                                                    className='rounded-circle offset-5 shadow-lg'
                                                    alt='Avatar Preview'
                                                    style={{width:"200px", height:"200px", objectFit:"cover",border:"5px solid white" }}
                                                />
                                            </figure>
                                        

                                <div className='form-group'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>

                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                accept='image/*'
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Avatar
                                        </label>
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                            {user&&user.password&&
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        defaultValue={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            }
                                <div className="form-group">
                                    <label htmlFor="age_field">Age</label>
                                    <input
                                        type="number"
                                        id="age_field"
                                        className="form-control"
                                        name='age'
                                        defaultValue={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address_field">Address</label>
                                    <input
                                        type="text"
                                        id="address_field"
                                        className="form-control"
                                        name='address'
                                        defaultValue={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact_field">Contact No.</label>
                                    <input
                                        type="text"
                                        id="contact_field"
                                        className="form-control"
                                        name='contact'
                                        defaultValue={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gender_field">Gender</label>
                                    <br/>
                                    <input
                                        type="radio"
                                        id="gender_field"
                                        name="gender"
                                        defaultValue="male"
                                        checked={gender === "male"? true:""}
                                        onChange={(e) => setGender(e.target.value)}
                                    /> Male &nbsp;&nbsp;
                                    <input
                                        type="radio"
                                        id="gender_field"
                                        name="gender"
                                        defaultValue="female"
                                        checked={gender === "female"? true:""}
                                        onChange={(e) => setGender(e.target.value)}
                                    /> Female
                                   
                                </div>


                                

                                <button type="submit" style={{backgroundColor:"#33cabb", color:"white"}} className="btn update-btn col-4 offset-4" disabled={loading ? true : false}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
             </div>
             </div>
        </Fragment>
    )
}

export default UpdateUser
