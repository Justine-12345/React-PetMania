import React,{ Fragment, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { loadUser, logout } from '../../actions/userActions'
import { adopt, clearErrors} from '../../actions/animalActions'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Fade from 'react-reveal/Fade';



const Animal = ({animal}) => {

	const alert = useAlert();
    const dispatch = useDispatch();
    const [successCount, setSuccessCount] = useState(0)

    const { user:currentUser, loading, isAuthenticated } = useSelector(state => state.auth)
  	const { user:updatedUser} = useSelector(state => state.user)
  	const { success, error} = useSelector(state => state.adopt)
		let user = undefined
		let navigate = useNavigate()

     useEffect(() => {

     // 	if(!localStorage.getItem("isAuthenticated")){
    	// 		localStorage.clear()
    	// }

    	 if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

      if (localStorage.getItem("isAuthenticated")&&currentUser&&Object.keys(currentUser).length<1) {
          dispatch(loadUser())            
    	}

    	// if(success){
    	// 	alert.success("Adoption Request send successfully")
    	// 	navigate()
    	// 	dispatch({ type: "ADOPT_RESET" })
    	// }

    	
    	// console.log("currentUser",currentUser&&Object.keys(currentUser).length)
    	// console.log("updatedUser",updatedUser)
    	console.log("user",user)
    }, [dispatch,user,currentUser,updatedUser,success])


   useEffect(() => {

    	if(success&&successCount===0){
    		setSuccessCount(1)
    		
    		navigate(`user/${user._id}`)
    		console.log(success)
    	}

    	
    }, [dispatch, success, alert, navigate])

   	
   	if (localStorage.getItem("isAuthenticated")) {
	 	if(updatedUser){
	 		user = updatedUser;
	 	}
	 	else{
	 		user = currentUser;
	 	}
 	}

 	const onClick = (e) => {

 		if(user&&user.role !== "adopter"){
 			 alert.error("Reqest Denied, Your role is not Adopter")
 		}

 		if(user&&user.role === "adopter"){

 				 confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>You want to adopt this animal?</p>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                   dispatch(adopt(e.target.id))
                    onClose();
                  }}
                >
                  Yes, Adopt it!
                </button>
              </div>
            );
          }
        });
 				 
 		}


 		}





	return(
			<Fragment>
      <Fade bottom>
				<div className="card col-md-2 animalCard" style={{margin:"24px"}}>
						  <img src={animal.images[0].url} className="card-img-top cardImage" alt="..."/>
						   <span className="cardName">{animal.name} ({animal.category})</span>
						  <Link to={`/animal/${animal._id}`} className="btn cardButton">VIEW</Link>
						  {user&&user.role==="adopter"?<button className="btn cardButton" id={animal._id} onClick={onClick} style={{  marginBottom: "20px", marginTop: "12px"}}>ADOPT</button>:<br/>}
				</div>
        </Fade>
			</Fragment>
		)

}

export default Animal