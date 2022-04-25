import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

// import ListReviews from '../review/ListReviews'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getSickDetails, clearErrors } from '../../actions/diseaseActions'

import { useParams, Link} from 'react-router-dom'
// import { addItemToCart } from '../../actions/cartActions'

import Header from '../layout/Header'
import Sidebar from '../admin/Sidebar'
// import { NEW_REVIEW_RESET } from '../../constants/productConstants'


const DiseaseDetails = () => {

    // const [quantity, setQuantity] = useState(1)
    // const [rating, setRating] = useState(0);
    // const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, disease } = useSelector(state => state.diseaseDetails)

    // const { user } = useSelector(state => state.auth)
    // const { error: reviewError, success } = useSelector(state => state.newReview)

    let {id} = useParams();


    useEffect(() => {

        if(disease && disease._id !== id){
        dispatch(getSickDetails(id))
                 }


        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, id , disease])


    return (
        <Fragment>
            <Header/>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={disease.name} />
                    <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>


                    <div className="col-12 col-md-10">
                    <div className="row d-flex justify-content-around" style={{marginTop:"80px"}}>

                        <div className="col-12 col-lg-6 mt-1">
                            <h2><b style={{textTransform: "capitalize"}}>{disease.name}</b></h2>
                            <small id="product_id" style={{color:"grey"}}>Disease # {disease._id}</small>

                                    <hr />
                                    <h5 className="mt-2"> <p>Disease Description</p></h5>
                                    <p style={{color:"#565959", fontSize:"15px", textIndent: "50px"}}>{disease.description}</p>

                        
                             <hr /> 
                        
                        </div>
                    </div>
                    </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default DiseaseDetails
