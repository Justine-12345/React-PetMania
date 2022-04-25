import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { updateSick, getSickDetails, clearErrors } from '../../actions/diseaseActions'

import {useParams, useNavigate} from 'react-router-dom'
import { UPDATE_DISEASE_RESET, DISEASE_DETAILS_RESET } from '../../constants/diseaseConstants'

import Header from '../../components/layout/Header'


const UpdateDisease = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, disease } = useSelector(state => state.diseaseDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.disease);

    let navigate = useNavigate();
    let {id} = useParams();



    useEffect(() => {
        if (disease && disease._id !== id || isUpdated ) {
            dispatch(getSickDetails(id));
        } else {
            setName(disease.name);
            setDescription(disease.description);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            dispatch({ type: UPDATE_DISEASE_RESET })
            dispatch({ type: DISEASE_DETAILS_RESET })
            navigate('/admin/diseases');
            alert.success('Disease updated successfully');
                    }


    }, [dispatch, alert, error, isUpdated, updateError, id, navigate, disease])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);

        dispatch(updateSick(disease._id, formData))
     
    }

    return (
        <Fragment>
            <MetaData title={'Update Disease'} />
            <Header/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                       <div className="shadow-lg wrapper my-5 col-md-8" style={{margin:"auto", backgroundColor:"white", boxShadow:"1px 1px 5px #9e9e9e", borderRadius:"15px", padding:"24px"}}>
                            <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Disease</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                               <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <input
                                        type="text"
                                        id="description_field"
                                        className="form-control"
                                        defaultValue={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

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
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateDisease
