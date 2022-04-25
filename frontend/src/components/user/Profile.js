import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { loadUser } from '../../actions/userActions'
import {useParams} from 'react-router-dom'
import { UPDATE_USER_RESET,  USER_DETAILS_RESET} from '../../constants/userConstants'
import Header from '../layout/Header'
import Sidebar from '../admin/Sidebar'
const Profile = () => {

    const[user, setUser] = useState([]);
    const[adopted, setAdopted] = useState([]);


    const { animals } = useSelector(state => state.animals)
    const { user:currentUser, loading, isAuthenticated } = useSelector(state => state.auth)
    const { isUpdated , user:updatedUser} = useSelector(state => state.user)
    const dispatch = useDispatch()

    // let {id} = useParams();
     useEffect(() => {
        // console.log(user.adopted.length)
        console.log(adopted)
        console.log("user",adopted)
        if(updatedUser){
            setUser(updatedUser)
        }else if(currentUser){
            setUser(currentUser)
        }

      

        console.log(adopted)
        // user&&user.adopted.forEach(ua => {
        // setAdopted(old=>[...old, ua.animal])    
        // })



        // console.log("isAuthProfile",isAuthenticated)

        //     if(isUpdated){
        //       dispatch(loadUser())
        //       dispatch({type: UPDATE_USER_RESET})
        //      }

    
    }, [dispatch,user, currentUser, updatedUser, adopted])

    let  roleBadge;

    if (user&&user.role === "user") {
      roleBadge = <span className="badge badge-success" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>User</span>;
    } 
    else if (user&&user.role === "personnel"){
      roleBadge = <span className="badge badge-info" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Personnel</span>;
    }
    else if (user&&user.role === "adopter"){
      roleBadge = <span className="badge badge-primary" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Adopter</span>;
    }
    else if (user&&user.role === "deactive"){
      roleBadge = <span className="badge badge-danger" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Deactive</span>;
    }

    let adopterCounter = 0;

    return (
        <Fragment>
            {loading ? <Loader /> :(
               <Fragment>
                
                 <Header/>

                    <MetaData title={user.name} />
                    <div className="row d-flex justify-content-around">

                {user&&user.role === "personnel"?<div className="col-12 col-md-2">
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
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.address}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Contact No.</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.contact}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Gender</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.gender}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Age</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{user.age}</div>
                                   </div>

                                
                            </div>


                           {/* <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>*/}


                           {/* <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>

                            <hr />
*/}


                           {/* <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
*/}
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


                            {user.role === "adopter" && user.adopted && user.adopted.map(animal => {

                                    if(animal.animal&&animal.animal&&animal.animal.adopt&&animal.animal.adopt.adoptStatus == "adopted"){
                                        adopterCounter++;
                                        return(
                                             <Fragment key={animal.animal._id}>

                                                <Link to={`/animal/${animal.animal._id}`}>
                                                    <div className="card col-md-4 animalCard">
                                                              <img src={animal.animal.images[0].url} className="card-img-top cardImage" alt="..."/>
                                                               <span className="cardName">{animal.animal.name} ({animal.animal.category})</span>
                                                    </div>
                                                </Link>
                                            </Fragment>
                                         )
                                    }
                            })}

                          {/*    <div>
                                {for (var i = 0; i < user.adopted.length; i++) {
                                    const ua = user.adopted[i]
                                    setAdopted(old=>[...old,ua._id])
                                }
                                }
                                </div>
                                */}
                        {/*    {user.role === "adopter" && user.adopted.map(aanimal => {
                       

                                animals.map(animal=>{

                                    if(aanimal.animal === animal._id){
                                    return(
                                                <Fragment key={animal._id}>
                                                {console.log(animal._id)}
                                                <Link to={`/animal/${animal._id}`}>
                                                    <div className="card col-md-4 animalCard">rffgh
                                                              <img src={animal.images[0].url} className="card-img-top cardImage" alt="..."/>
                                                               <span className="cardName">{animal.name} ({animal.category})</span>
                                                    </div>
                                                </Link>
                                                </Fragment>

                                            )
                                    }

                                })


                            })

                            }*/}



                            {user.role === "adopter" && user.adopted && 
                                adopterCounter < 1?  
                                <Fragment>
                                    <br/>
                                    <small style={{color:"#828282"}}><i>No Adopted Animal</i></small> <br/>
                                     <br/>
                                </Fragment>:"" 

                            }



                       {/*     {
                                animal.health === "healthy" ? 
                                <Fragment>
                                    <br/>
                                    <small style={{color:"#828282"}}><i>This Animal is Healthy</i></small> <br/>
                                     <br/>
                                </Fragment>:""
                            }*/}

                             <hr /> 

                            
                                        
                               
                            {/*<hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Submit Your Review
                            </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            }*/}


                            {/*<div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>*/}


                        </div>

                      </div>
                    </div>
                </div>

                    {/*{product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}*/}

                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
