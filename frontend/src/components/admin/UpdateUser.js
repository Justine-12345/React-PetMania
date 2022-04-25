import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET,  USER_DETAILS_RESET} from '../../constants/userConstants'
import {useNavigate, useParams} from 'react-router-dom'
import Header from '../layout/Header'

const UpdateUser = () => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')

    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [roleDesc, setRoleDesc] = useState('')

    const [accType, setAccType] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated, loading, user:selectedUser} = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)

    const {id} = useParams();

    let navigate = useNavigate();

    const roles = [
         'user',
         'adopter',
         'personnel',
         'deactive'
    ]

    useEffect(() => {
        if (user && user._id !== id || isUpdated) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name);
            setEmail(user.email);
            setAge(user.age);
            setGender(user.gender);
            setAddress(user.address);
            setContact(user.contact);
            setRoleDesc(user.roleDesc);
            setRole(user.role);
            setAccType(user.accType);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            dispatch({type: UPDATE_USER_RESET})
            dispatch({ type: USER_DETAILS_RESET })
            navigate('/admin/users')
            alert.success('User updated successfully')
        }

    }, [dispatch, alert, error, navigate, isUpdated, id,navigate, user])

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
        dispatch(updateUser(user._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
             <Header/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
            
                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="shadow-lg wrapper my-5 col-md-8" style={{margin:"auto", backgroundColor:"white", boxShadow:"1px 1px 5px #9e9e9e", borderRadius:"15px", padding:"24px"}}>
                            <form onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>

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
                                {/*{console.log(accType)}*/}
                                {accType==="local"&&
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
                                        onChange={(e) => setName(e.target.value)}
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


                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>


                                    <select className="form-control" id="role_field" value={role} onChange={(e) => setRole(e.target.value)}>
                                        {roles.map(r => (
                                            <option key={r} value={r} style={{textTransform: "capitalize"}} >{r}</option>
                                        ))}

                                    </select>


                                

                                       
                                </div>

                                {role === "personnel" && 

                                <div className="form-group">
                                    <label htmlFor="roleDesc_field">Job description</label>

                                    <input
                                        type="text"
                                        id="roleDesc_field"
                                        className="form-control "
                                        name='roleDesc'
                                        defaultValue={roleDesc}
                                        onChange={(e) => setRoleDesc(e.target.value)}
                                    />
                                </div>
                            }

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-primary col-4 offset-4"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser
