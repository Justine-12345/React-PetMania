import React,{ Fragment, useEffect, useState } from 'react'
import Search from './Search'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { loadUser, logout } from '../../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCaretDown, faUser, faDoorOpen, faGear, faAddressCard, faKey } from '@fortawesome/free-solid-svg-icons'
import { GoogleLogout } from 'react-google-login';


const Header = () => {

	const[user, setUser] = useState();

	const alert = useAlert();
    const dispatch = useDispatch();

    const { user:currentUser, loading } = useSelector(state => state.auth)
		const { user:updatedUser} = useSelector(state => state.user)

		let navigate = useNavigate(); 
	// let user
	
	// console.log(currentUser)


	useEffect(() => {

	
		if (localStorage.getItem("isAuthenticated")) {
			if(updatedUser){
	            setUser(updatedUser)
	        }else if(currentUser){
	            setUser(currentUser)
	        }
    	}

        // if (localStorage.getItem("isAuthenticated")) {
          // dispatch(loadUser())            
    	// }

    	// console.log(currentUser)
    	// console.log(updatedUser)
    	// console.log("user",user&&Object.keys(user).length)
    	// user&&user.forEach(u=>{
    	// 	console.log(u)
    	// })
    }, [dispatch,updatedUser,currentUser,alert, user])
   	


    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
        setUser(undefined)
				localStorage.clear()
    }

    const navHome = () => {
    		navigate('/')
    }
    
  //   if (localStorage.getItem("isAuthenticated")) {
	 // 	if(updatedUser){
	 // 		user = updatedUser;
	 // 	}
	 // 	else{
	 // 		user = currentUser;
	 // 	}
 	// }
 	let  roleBadge;

    if (user&&user.role === "user") {
      roleBadge = <span className="badge badge-success" style={{fontSize:"10px", position:"relative", bottom:"-11px", height:"14px"}}>User</span>;
    } 
    else if (user&&user.role === "personnel"){
      roleBadge = <span className="badge badge-info" style={{fontSize:"10px", position:"relative", bottom:"-10px", height:"14px"}}>Personnel</span>;
    }
    else if (user&&user.role === "adopter"){
      roleBadge = <span className="badge badge-primary" style={{fontSize:"10px", position:"relative", bottom:"-11px", height:"14px"}}>Adopter</span>;
    }
    else if (user&&user.role === "deactive"){
      roleBadge = <span className="badge badge-danger" style={{fontSize:"10px", position:"relative", bottom:"-11px", height:"14px"}}>Deactive</span>;
    }

 	 // console.log("user",user===undefined)




	return(
			<Fragment>
			<style>{'body { background: rgb(255,255,255);background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(210,255,236,1) 53%, rgba(169,246,255,1) 100%); }'}</style>

			 	<nav className="navbar navbar-expand-lg navbar-light ">
					<span onClick={navHome} className="navbar-brand"><img className="logo" src="https://res.cloudinary.com/dpvofuwy8/image/upload/v1649264276/assets/logo_lbforh.png" /></span>  		
					<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">

						<Search/>
						
						{user&&currentUser ?(

								<div className="navbar-nav ml-auto action-buttons">
								
									{user && user.avatar ?
                                        <img className="d-block " src={user.avatar.url} alt={user.avatar.url} style={{borderRadius:"50%", height:"35px", width:"35px", objectFit:"cover"}}/>:""
                                 		}
                                 &nbsp;&nbsp;
                                 {roleBadge}
								<div className="nav-item dropdown">
									<a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle mr-4">{user.name}&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown} /></a>
									<div className="dropdown-menu action-form">
										<Link to={`/user/${user._id}`}><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;My Profile</Link>
										<br/>
										<br/>


                						<div className="dropdown1" style={{position:"relative",left:"-7px"}}>
										  <button className="dropbtn1"><FontAwesomeIcon icon={faGear} />&nbsp;&nbsp;Update</button>
										  <div className="dropdown-content1">
										   <br/>
										  <Link to="/me/update">&nbsp;&nbsp;<FontAwesomeIcon icon={faAddressCard} />&nbsp;&nbsp;Profile</Link>
										{user&&user.password&&
											<Fragment>
										  <br/>
										  <Link to="/password/update">&nbsp;&nbsp;<FontAwesomeIcon icon={faKey} />&nbsp;&nbsp;Password</Link>
										 
										  </Fragment>
										}
										 <br/>
										  </div>
										</div>

										<hr/>
										
										<Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}><FontAwesomeIcon icon={faDoorOpen} />&nbsp;&nbsp;Logout</Link>
                					

                					</div>
          
								</div>
								{/*{console.log("name")}*/}
					        	</div>
				        	):

								<div className="navbar-nav ml-auto action-buttons">
										<div className="nav-item dropdown">
											<Link to="/login" href="#" className="nav-link dropdown-toggle mr-4">Login</Link>
							                
										</div>
										<div className="nav-item dropdown">
											<Link to="/register" className="btn btn-primary dropdown-toggle sign-up-btn">Sign up</Link>
							  	
										</div>
							   </div>
										
						}
						

						{/*{user===undefined && 
							<div className="navbar-nav ml-auto action-buttons">
									<div className="nav-item dropdown">
										<Link to="/login" href="#" className="nav-link dropdown-toggle mr-4">Login</Link>
						                
									</div>
									<div className="nav-item dropdown">
										<Link to="/register" className="btn btn-primary dropdown-toggle sign-up-btn">Sign up</Link>
						  	
									</div>
						        </div>

						}*/}

						



					</div>
				</nav>
			</Fragment>
		)

} 

export default Header