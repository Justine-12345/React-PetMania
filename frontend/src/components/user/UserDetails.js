import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

// import ListReviews from '../review/ListReviews'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, clearErrors } from '../../actions/userActions'
// import { addItemToCart } from '../../actions/cartActions'
import {useParams, Link} from 'react-router-dom'
import Header from '../layout/Header'
import Sidebar from '../admin/Sidebar'
// import { NEW_REVIEW_RESET } from '../../constants/productConstants'


const UserDetails = () => {
    const[user, setUser] = useState([]);

    const [adopted, setAdopted] = useState([])

    const dispatch = useDispatch();
    const alert = useAlert();


     const { user:currentUser, loading, error } = useSelector(state => state.userDetails)
    const { isUpdated , user:updatedUser} = useSelector(state => state.user)
    const { user:userAuth} = useSelector(state => state.auth)
     const { success, error:adoptError} = useSelector(state => state.adopt)

    let {id} = useParams();


    useEffect(() => {

        if(user && user._id !== id){
        dispatch(getUserDetails(id))
        }

       
        if(updatedUser){
            setUser(updatedUser)
        }else if(currentUser){
            setUser(currentUser)
        }

  

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

         if (adoptError) {
            alert.error(adoptError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Adoption Request Sent...");
            dispatch(clearErrors())

            dispatch({ type: "ADOPT_RESET" })
        }

     
    }, [dispatch, alert,user,userAuth, error,user, id , adopted, currentUser, updatedUser, success, adoptError])


    let  roleBadge;

    if (user.role === "user") {
      roleBadge = <span className="badge badge-success" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>User</span>;
    } 
    else if (user.role === "personnel"){
      roleBadge = <span className="badge badge-info" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Personnel</span>;
    }
    else if (user.role === "adopter"){
      roleBadge = <span className="badge badge-primary" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Adopter</span>;
    }
    else if (user.role === "deactive"){
      roleBadge = <span className="badge badge-danger" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Deactive</span>;
    }







    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Header/>
                    <MetaData title={user.name} />
                    <div className="row d-flex justify-content-around">

                    {userAuth&&userAuth.role === "personnel"?<div className="col-12 col-md-2">
                    <Sidebar />
                    </div>:""}

                    <div className="col-12 col-md-10">
                    <div className="row d-flex justify-content-around" style={{marginTop:"80px"}}>
                        <div className="col-12 col-lg-4 img-fluid  " id="product_image" >
                            <div pause='hover' className="animalCaro">
                                {user && user.avatar ?
                                        <img className="d-block w-100" src={user.avatar.url} alt={user.avatar.url} style={{borderRadius:"20px", height:"430px", objectFit:"cover"}}/>:""
                                 } 
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 mt-1">
                            <h2><b style={{textTransform: "capitalize"}}>{user.name}</b> {roleBadge}</h2>
                            <small id="product_id" style={{color:"grey"}}>User # {user._id}</small>

                            <hr />

                            <div className="rating-outer" style={{color:"#565959"}}>
                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Email</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.email}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Address</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.address!=="undefined"?user.address:"N/A"}</div>
                                            
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Contact No.</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.contact!=="undefined"?user.contact:"N/A"}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Gender</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.gender!=="undefined"?user.gender:"N/A"}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Age</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.age!=="undefined"?user.age:"N/A"}</div>
                                   </div>

                                
                            </div>



                            {user.role === "personnel" && 
                                <Fragment>
                                    <hr />
                                    <h5 className="mt-2"> <p>Job Description</p></h5>
                                    <p style={{color:"#565959", fontSize:"15px", textIndent: "50px"}}>{user.roleDesc}</p>
                                </Fragment>

                            }
                             

                            {user.role === "adopter" && 
                            <Fragment><hr /><h5 className="mt-1"><b>Adopted By {user.name}</b></h5><br/></Fragment>
                            }

                            <div className="row" style={{width:"100%"}}>
                            {user.role === "adopter" && user.adopted && user.adopted.map(animal => {
                                    if(animal.animal.adopt.adoptStatus == "adopted"){
                                        return(
                                             <Fragment key={animal.animal._id} >
                                                <div className="col-md-6">
                                                <Link to={`/animal/${animal.animal._id}`}>
                                                    <div className="card col-md-12 animalCard">
                                                              <img src={animal.animal.images[0].url} className="card-img-top cardImage" alt="..."/>
                                                               <span className="cardName">{animal.animal.name} ({animal.animal.category})<span className="badge badge-success" style={{fontSize:"10px", position:"relative", bottom:"-5px", right:"5px", float:"right"}}>Adopted</span></span>
                                                    </div>
                                                </Link>
                                                </div>
                                            </Fragment>
                                         )
                                    }
                                    else{
                                        return(
                                        <Fragment key={animal.animal._id} >
                                                <div className="col-md-6">
                                                <Link to={`/animal/${animal.animal._id}`}>
                                                    <div className="card col-md-12 animalCard">
                                                              <img src={animal.animal.images[0].url} className="card-img-top cardImage" alt="..."/>
                                                               <span className="cardName">{animal.animal.name} ({animal.animal.category})<span className="badge badge-secondary" style={{fontSize:"10px", position:"relative", bottom:"-5px", right:"5px", float:"right"}}>Pending</span></span>
                                                    </div>
                                                </Link>
                                                </div>
                                            </Fragment>
                                            )
                                    }
                            }).reverse()}
                            </div>

                            {user.role === "adopter" && user.adopted && 
                                user.adopted.length < 1?  
                                <Fragment>
                                    <br/>
                                    <small style={{color:"#828282"}}><i>No Adopted Animal</i></small> <br/>
                                     <br/>
                                </Fragment>:"" 

                            }



                     

                        </div>
                    </div>
                    </div>
                    </div>

                  

                </Fragment>
            )}
        </Fragment>
    )
}

export default UserDetails
