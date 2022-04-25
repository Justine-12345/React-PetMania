import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import DotLoader from '../layout/DotLoader'
import MetaData from '../layout/MetaData'

import Header from '../layout/Header'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAnimalDetails, newComment, clearErrors } from '../../actions/animalActions'
// import { addItemToCart } from '../../actions/cartActions'
import {useParams, Link} from 'react-router-dom'

import { NEW_COMMENT_RESET } from '../../constants/animalConstants'

import { loadUser } from '../../actions/userActions'
import Sidebar from '../admin/Sidebar'
import dateFormat, { masks } from "dateformat";
import Filter from 'bad-words';

import InfiniteScroll from 'react-infinite-scroll-component';

const AnimalDetails = () => {

    const [sicks, setSicks] = useState([])
    const [adopter, setAdopter] = useState([])
    // const [quantity, setQuantity] = useState(1)
    // const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [name, setName] = useState('');

    const [items, setItems] = useState([])
    const [comments, setComments] = useState([])


    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, animal } = useSelector(state => state.animalDetails)

    const { user:currentUser } = useSelector(state => state.auth)
    const { user:updatedUser} = useSelector(state => state.user)
    const {success} = useSelector(state => state.newComment)
    let user = undefined
    // const { user } = useSelector(state => state.auth)
    // const { error: reviewError, success } = useSelector(state => state.newReview)

    let {id} = useParams();

    
      const fetchMoreData = () => {

        setTimeout(() => {
            let add = 0

           if(items.length >= comments.length+2){
                add = 2
           }else{
                add = items.length - comments.length
           }

           const counter = comments.length + add        
           setComments(items.slice(0,counter))
        }, 1500);

      };




    useEffect(() => {

        

        // console.log(success)

        if(success){
            setContent('')
            if(currentUser ){
              setName(currentUser.name)
            }else{
            setName('')
            }
        }

         if(currentUser ){
              setName(currentUser.name)
            }


        if(loading){
        setComments([])
        setItems([])
        }


        if(animal && animal._id !== id || success){
        dispatch(getAnimalDetails(id))
        dispatch({ type: NEW_COMMENT_RESET })
        setComments([])
        setItems([])
        }

       

        if(animal&&animal.comments || success){
            setItems(animal.comments)
            setComments(items.slice(0,5))
        }

         console.log()
   
        
        setSicks(animal.sicks)

        setAdopter(animal.adopt)


        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (localStorage.getItem("isAuthenticated")) {
          dispatch(loadUser())            
        }


        // if (reviewError) {
        //     alert.error(reviewError);
        //     dispatch(clearErrors())
        // }

        // if (success) {
        //     alert.success('Reivew posted successfully')
        //     dispatch({ type: NEW_REVIEW_RESET })
        // }
        

    }, [dispatch, alert, error, /*reviewError,*/ id , success, animal, sicks, adopter, name])

    // const addToCart = () => {
    //     dispatch(addItemToCart(id, quantity));
    //     alert.success('Item Added to Cart')
    // }

    // const increaseQty = () => {
    //     const count = document.querySelector('.count')

    //     if (count.valueAsNumber >= product.stock) return;

    //     const qty = count.valueAsNumber + 1;
    //     setQuantity(qty)
    // }

    // const decreaseQty = () => {

    //     const count = document.querySelector('.count')

    //     if (count.valueAsNumber <= 1) return;

    //     const qty = count.valueAsNumber - 1;
    //     setQuantity(qty)

    // }

    // function setUserRatings() {
    //     const stars = document.querySelectorAll('.star');

    //     stars.forEach((star, index) => {
    //         star.starValue = index + 1;

    //         ['click', 'mouseover', 'mouseout'].forEach(function (e) {
    //             star.addEventListener(e, showRatings);
    //         })
    //     })

    //     function showRatings(e) {
    //         stars.forEach((star, index) => {
    //             if (e.type === 'click') {
    //                 if (index < this.starValue) {
    //                     star.classList.add('orange');

    //                     setRating(this.starValue)
    //                 } else {
    //                     star.classList.remove('orange')
    //                 }
    //             }

    //             if (e.type === 'mouseover') {
    //                 if (index < this.starValue) {
    //                     star.classList.add('yellow');
    //                 } else {
    //                     star.classList.remove('yellow')
    //                 }
    //             }

    //             if (e.type === 'mouseout') {
    //                 star.classList.remove('yellow')
    //             }
    //         })
    //     }
    

    const commentHandler = () => {
        const formData = new FormData();

        const filter = new Filter();

        formData.set('name', filter.clean(name));
        formData.set('content', filter.clean(content));
        formData.set('animalId', id);

        console.log(name)

        dispatch(newComment(formData));
    }

    if (localStorage.getItem("isAuthenticated")) {
        if(updatedUser){
            user = updatedUser;
        }
        else{
            user = currentUser;
        }
    }

    const onClick = () => {

        if(user&&user.role === "user"){
           alert.error("Reqest Denied, Your role is not Adopter")
        }

        }




    return (
        <Fragment>
        <Header/>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={animal.name} />
                    
                    <div className="row">

                    {user&&user.role === "personnel"?<div className="col-12 col-md-2">
                    <Sidebar />
                    </div>:""}


                    <div className="col-12 col-md-10">
                    <div className="row d-flex justify-content-around" style={{marginTop:"80px"}}>
                        <div className="col-12 col-lg-4 img-fluid  " id="product_image" >
                            <Carousel pause='hover' className="animalCaro">
                                {animal.images && animal.images.map(image => (
                                    <Carousel.Item key={image.public_id}  style={{borderRadius:"24px"}} >
                                        <img className="d-block w-100" src={image.url} alt={animal.title} style={{borderRadius:"20px", height:"400px", objectFit:"cover"}}/>
                                    </Carousel.Item>
                                ))}
                                 {!animal.images &&
                                <Carousel.Item  style={{borderRadius:"24px"}} >
                                        <img className="d-block w-100" src="https://svgsilh.com/svg/1517090.svg" alt="blank animal profile" style={{borderRadius:"20px",width:"10px", height:"400px", objectFit:""}}/>
                                </Carousel.Item >
                              }
                            </Carousel>
                             
                        </div>

                        <div className="col-12 col-lg-6 mt-1">
                            <h2><b style={{textTransform: "capitalize"}}>{animal.name}</b></h2>
                            <small id="product_id" style={{color:"grey"}}>Animal # {animal._id}</small>

                            <hr />

                            <div className="rating-outer" style={{color:"#565959"}}>
                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Category</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{animal.category}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Breed</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{animal.breed}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Gender</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{animal.gender}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Age</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{animal.age}</div>
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
                            <hr />

                            <h5 className="mt-1">Health {animal.health === "sick"?<span className="badge badge-danger" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>sick</span>: <span className="badge badge-success" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Healthy</span>}</h5>
                            {/*<p>{product.description}</p>*/}

                            <ul>

                            {sicks&& sicks.map(si=>(
                                <Fragment key={si._id}>
                                    <li>{si.sick.name} - {si.sick.description}</li> <br/>
                                </Fragment>
                                ))}
                            
                            </ul>

                            {
                                animal.health === "healthy" ? 
                                <Fragment>
                                    <br/>
                                    <small style={{color:"#828282"}}><i>This Animal is Healthy</i></small> <br/>
                                     <br/>
                                </Fragment>:""
                            }

                             <hr /> 

                             <h5 className="mt-2"> <p>Adopter {adopter && adopter.adoptDate ? <span className="badge badge-secondary" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Adopted</span>: <span className="badge badge-success" style={{fontSize:"10px", position:"relative", bottom:"5px"}}>Unadopt</span>}</p></h5>
                            {
                                adopter && adopter.adoptDate ? 
                                <Fragment>
                                    
                                    <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Name</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}><Link style={{color:"#4d4d4d"}} to={`/user/${adopter.adopter._id}`}>{adopter.adopter.name}</Link></div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Adress</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{adopter.adopter.address}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Age</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{adopter.adopter.age}</div>
                                   </div>

                                   <div className="row" style={{width:"100%", padding:"4px"}}>
                                            <small className="col-md-2">Contact</small>
                                             <div className="col-md-9" style={{color:"#4d4d4d", fontWeight:"700"}}>{adopter.adopter.contact}</div>
                                   </div>                                

                                </Fragment>

                                :
                                <Fragment>
                                    <br/>
                                    <small style={{color:"#828282"}}><i>Not Adopter Yet</i></small> <br/>
                                     <br/>
                                </Fragment>
                            }

                            <hr/>
                            {user&&user.role === "adopter" &&animal.adopt&&animal.adopt.adoptStatus === "unAdopt" ?<button className="btn cardButton" onClick={onClick} style={{  marginBottom: "20px", marginTop: "12px"}}>ADOPT</button>:<br/>}

                            {animal&&animal.adopt&&animal.adopt.adoptStatus === "pending" ?<small style={{color:"#828282"}}><i>Adoption is pending.....</i></small>:<br/>}

                            {animal&&animal.adopt&&animal.adopt.adoptStatus === "adopted" ?<small style={{color:"#828282"}}><i>Adopted</i></small>:<br/>}

                            {user&&user.role === "personnel"&&animal.adopt&&animal.adopt.adopter&&<Link to={`/user/${animal.adopt.adopter._id}`}><small style={{color:"#828282"}}><i>&nbsp;By {animal.adopt.adopter.name}</i></small></Link>}

                            {!user&& <Link to="/login" className="btn cardButton" onClick={onClick} style={{  marginBottom: "20px", marginTop: "12px"}}>Login To Adopt</Link>}
                            <br/>
                             <br/>


                            <h5>Comment</h5>
                                
                                    <input
                                        name="name"
                                        type="name"
                                        id="name" className="form-control mt-3"
                                        defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Write your name here ..."
                                    />

                                    <textarea
                                        name="review"
                                        id="review" className="form-control mt-3"
                                        defaultValue={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Write your comments here ..."
                                    >

                                </textarea>

                                <button className="btn my-3 float-right review-btn cardButton" onClick={commentHandler} style={{width:"90px"}}>Submit</button>
                           

                            <br/>
                            <br/>
       

                     
                            
                               {comments && (
                                    <div className="reviews w-75">
                                        <h5>Other's Comments:</h5>
                                        <hr />
                                        <InfiniteScroll
                                           
                                          dataLength={comments.length} 
                                          next={fetchMoreData}
                                          hasMore={comments.length >= items.length? false:true}
                                          loader={<h4><DotLoader/></h4>}
                                          endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                              <b>Yay! You have seen it all</b>
                                            </p>
                                          }
                                          
                                          
                                        >
                                        
                                       
                                        {comments.map(comment => (
                                            <div key={comment._id} className="review-card my-3">
                                                
                                               {/* <div className="rating-outer">
                                                    <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                                                </div>*/}

                                                <p className="review_user"><b>by {comment.name}</b></p>
                                                <small style={{position:"relative", top:"-17px", color:"#797979"}}><i>{dateFormat(comment.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</i></small>
                                                <p className="review_comment">{comment.content}</p>

                                                <hr />
                                            </div>
                                         

                                        ))}


                                        </InfiniteScroll>
                                    </div>
                                )}
       
                               
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
                                                </div>*/}

                                               


                                           {/* </div>
                                        </div>
                                    </div>

                                </div>
                            </div>*/}


                        </div>
                    </div>
                    </div>

                    </div>






                 
                </Fragment>
            )}
        </Fragment>
    )
}

export default AnimalDetails
