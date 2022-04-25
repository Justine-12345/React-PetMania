import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import {useNavigate} from 'react-router-dom'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newSick, clearErrors } from '../../actions/diseaseActions'
import { NEW_DISEASE_RESET } from '../../constants/diseaseConstants'
import Header from '../../components/layout/Header'

// import { getSicks } from '../../actions/diseaseActions'

import axios from 'axios';


const NewAnimal = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    let navigate = useNavigate();

    const alert = useAlert();
    const dispatch = useDispatch();

    // const { disease } = useSelector(state => state.diseases);

    const { loading, error, success } = useSelector(state => state.newDisease);

   

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/diseases');
            alert.success('Disease created successfully');
            dispatch({ type: NEW_DISEASE_RESET })
        }
        

      
        // if(disease.length === 0){
        //     dispatch(getSicks())
        // }

        
        // const {data} = axios.get(`/api/v1/sicks`)
        // .then(response => {
        //  const dis = response.data.sicks;
        //  setDiseases(dis)
        // })
        // .catch(err=>{
        //  // console.log(err)
        // })

    }, [dispatch, alert, error, success, navigate, /*disease*/])

 

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        
        dispatch(newSick(formData))
    }



    return (
        <Fragment>
            <MetaData title={'New Disease'} />
            <Header/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 ">
                    <Fragment>
                        <div className="shadow-lg wrapper my-5 col-md-8" style={{margin:"auto", backgroundColor:"white", boxShadow:"1px 1px 5px #9e9e9e", borderRadius:"15px", padding:"24px"}}>
                            <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Disease</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
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
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewAnimal