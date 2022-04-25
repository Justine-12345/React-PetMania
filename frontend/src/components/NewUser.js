import React,{ Fragment, useEffect, useState} from 'react'
import MetaData from './layout/MetaData'

import {useDispatch, useSelector} from 'react-redux'
import {getAnimals} from '../actions/animalActions'
import Loader from './layout/Loader'

import {useAlert} from 'react-alert'
import {useParams} from 'react-router-dom'


const NewUser = () => {

	 const[user, setUser] = useState({});


    const { user:currentUser, loading, isAuthenticated } = useSelector(state => state.auth)
    const { isUpdated , user:updatedUser} = useSelector(state => state.user)
    const dispatch = useDispatch()
     useEffect(() => {

        // console.log(updatedUser)

        if(updatedUser){
            setUser(updatedUser)
        }else if(currentUser){
            setUser(currentUser)
        }

        // console.log("isAuthProfile",isAuthenticated)

        //     if(isUpdated){
        //       dispatch(loadUser())
        //       dispatch({type: UPDATE_USER_RESET})
        //      }

    
    }, [dispatch])

	return(
		<Fragment>
			<Fragment>
			 <MetaData title={'Adopt Healthy Animals'} />
				<div className="container" >
				<br/>
				<br/>
				<br/>
					<div style={{marginTop:"24px", background:"white", boxShadow:"2px 2px 6px #9e9e9e", width:"50%", margin:"auto", padding:"12px"}}>
					<div className="row justify-content-center" >
						<img src="https://img.freepik.com/free-vector/managers-looking-chart-monitor_1262-19283.jpg?w=2000" style={{width:"40%"}}/>				
					</div>
					<div className="row justify-content-center" >
						<h2 style={{textAlign:"center", width:"100%", display:"block"}}>Welcome to our Petsop, wait for the Admin Confirmation</h2>
					</div>
				</div>
				</div>
			</Fragment>
    
    </Fragment>
		)
}

export default NewUser