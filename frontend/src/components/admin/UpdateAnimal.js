import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import { updateAnimal, getAnimalDetails, clearErrors } from '../../actions/animalActions'

import {useParams, useNavigate} from 'react-router-dom'
import { UPDATE_ANIMAL_RESET, ANIMAL_DETAILS_RESET } from '../../constants/animalConstants'

import { getSicks } from '../../actions/diseaseActions'
import Header from '../layout/Header'
import axios from 'axios';


const UpdateAnimal = () => {

    const [name, setName] = useState('');
    const [gender, setGender] = useState(0);
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [category, setCategory] = useState('');
    const [sicks, setSicks] = useState([]);
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    // const [diseases, setDiseases] = useState([])

    let navigate = useNavigate();
    const categories = [
         'Dog',
         'Cat'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, animal } = useSelector(state => state.animalDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.animal);
    const { disease } = useSelector(state => state.diseases);

    let {id} = useParams();



    useEffect(() => {

        // console.log("animal", animal == true)
        // console.log("id",  animal._id !== id)
        // console.log("isUpdated", isUpdated)

        if (animal && animal._id !== id || isUpdated ) {
            dispatch(getAnimalDetails(id));
        } else {
            setName(animal.name);
            setGender(animal.gender);
            setAge(animal.age);
            setBreed(animal.breed);
            setCategory(animal.category);
            setOldImages(animal.images);

        
            animal.sicks.forEach(sick => {
                setSicks(oldArray => [...oldArray, sick.sick._id])
            })
           
            

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
            dispatch({ type: UPDATE_ANIMAL_RESET })
            dispatch({ type: ANIMAL_DETAILS_RESET })
            navigate('/admin/animals');
            alert.success('Product updated successfully');
                    }

        if(disease.length === 0){
            dispatch(getSicks())
        }

        // axios.get(`/api/v1/sicks`)
        // .then(response => {
        //     const dis = response.data.sicks;
        //      setDiseases(dis)
        // })
        // .catch(err=>{
        //     // console.log(err)
        // })

    }, [dispatch, alert, error, isUpdated, updateError, animal, id, navigate])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('gender', gender);
        formData.set('age', age);
        formData.set('breed', breed);
        formData.set('category', category);
        
        sicks.forEach(sick => {
            formData.append('sicks', sick)
        })

        images.forEach(image => {
            formData.append('images', image)
        })

        console.log(sicks)

        dispatch(updateAnimal(animal._id, formData))
     
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'Update Animal'} />
            <Header/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                       <div className="shadow-lg wrapper my-5 col-md-8" style={{margin:"auto", backgroundColor:"white", boxShadow:"1px 1px 5px #9e9e9e", borderRadius:"15px", padding:"24px"}}>
                            <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Animal</h1>

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
                                    <label htmlFor="age_field">Age</label>
                                    <input
                                        type="number"
                                        id="age_field"
                                        className="form-control"
                                        defaultValue={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="breed_field">Breed</label>
                                    <input
                                        type="text"
                                        id="breed_field"
                                        className="form-control"
                                        defaultValue={breed}
                                        onChange={(e) => setBreed(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                 </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (

                                        <img key={img.url} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img key={img} src={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

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
                                    <label htmlFor="disease_field">Diseases</label>
                                    <br/>{console.log("sicks",sicks)}
                                    {disease.map(di => {

                                       

                                         const isExist = sicks.includes(di._id)
                                            console.log("disease",di._id)
                                            {return(
                                                <Fragment key={di._id}>
                                                    <input
                                                        type="checkbox"
                                                        id="disease_field"
                                                        checked ={isExist ? true: ""}
                                                        value={di._id}
                                                        onChange={(e) => {e.target.checked ? setSicks(oldArray => [...oldArray, e.target.value]):setSicks(sicks.filter(item => item !== e.target.value)) }}
                                                    /> {di.name} <br/>
                                                </Fragment>
                                            )}
                                       

                                    })}
                                    


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

export default UpdateAnimal
