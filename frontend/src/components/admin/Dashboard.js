import React,{ Fragment, useEffect, useState} from 'react'
import MetaData from '../layout/MetaData'

import {useDispatch, useSelector} from 'react-redux'
// import {getAnimals} from '../actions/animalActions'
import Loader from '../layout/Loader'

import {useAlert} from 'react-alert'
import {Link, useParams} from 'react-router-dom'
import Header from '../../components/layout/Header'
import Sidebar from './Sidebar'
import { loadUser} from '../../actions/userActions'
import { getRescuedMonthly, getAdoptedMonthly} from '../../actions/animalActions'
import { allUsers} from '../../actions/userActions'
import { Bar, defaults  } from 'react-chartjs-2'
// import {Chart, CategoryElement} from 'chart.js'
import Chart from "chart.js/auto";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUsers, faPaw, faHandHoldingHand} from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
	const [rStart, setRstart] = useState('');
	const [rEnd, setRend] = useState('');
	const [aStart, setAstart] = useState('');
	const [aEnd, setAend] = useState('');
	const [allRescued, setAllRescued] = useState(0);
	const [allAdopted, setAllAdopted] = useState(0);
	let rMonthName = [];


	const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { rescuedMonthName, rescuedMonthValue, error:rError, loading:rLoading } = useSelector(state => state.animalsMonthlyRescued);
  const { adoptedMonthName, adoptedMonthValue, error:aError, loading:aLoading } = useSelector(state => state.animalsMonthlyAdopted);
  const { loading:uLoading, error:uError, users } = useSelector(state => state.allUsers);

  useEffect(()=>{

  	// if(user){
  	// if (localStorage.getItem("isAuthenticated")) {
   //        dispatch(loadUser())            
   //  	}}
   	if(rescuedMonthValue){
   		if(!allRescued){
   			setAllRescued(rescuedMonthValue.reduce((partialSum, a) => partialSum + a, 0))
   		}
   	}

   	if(adoptedMonthValue){
   		if(!allAdopted){
   			setAllAdopted(adoptedMonthValue.reduce((partialSum, a) => partialSum + a, 0))
   		}
   	}

    if(!rescuedMonthName&&!rescuedMonthValue){
    dispatch(getRescuedMonthly())
  	}

  	if(!adoptedMonthName&&!adoptedMonthValue){
    dispatch(getAdoptedMonthly())
  	}

  	if(users&&users.length < 1){
     dispatch(allUsers());
  	}



   	if(rError){
   		alert.error(rError)
   	}

    }, [dispatch, alert, rError, rescuedMonthName, rescuedMonthValue, adoptedMonthName, adoptedMonthValue, users]);



  	const rescuedData = {
										labels: rescuedMonthName&&rescuedMonthName,
										datasets: [
										{
											label: 'Rescued Animals Monthly',
															              data: rescuedMonthValue&&rescuedMonthValue,
															              backgroundColor: [
															                'rgba(255, 99, 132, 0.2)',
															                'rgba(54, 162, 235, 0.2)',
															                'rgba(255, 206, 86, 0.2)',
															                'rgba(75, 192, 192, 0.2)',
															                'rgba(153, 102, 255, 0.2)',
															                'rgba(255, 159, 64, 0.2)',
															              ],
															              borderColor: [
															                'rgba(255, 99, 132, 1)',
															                'rgba(54, 162, 235, 1)',
															                'rgba(255, 206, 86, 1)',
															                'rgba(75, 192, 192, 1)',
															                'rgba(153, 102, 255, 1)',
															                'rgba(255, 159, 64, 1)',
															              ],
															              borderWidth: 1,
											},
															            
											],
									}

		  	const adoptedData = {
										labels: adoptedMonthName&&adoptedMonthName,
										datasets: [
										{
											label: 'Adopted Animals Monthly',
															              data: adoptedMonthValue&&adoptedMonthValue,
															              backgroundColor: [
															                'rgba(255, 99, 132, 0.2)',
															                'rgba(54, 162, 235, 0.2)',
															                'rgba(255, 206, 86, 0.2)',
															                'rgba(75, 192, 192, 0.2)',
															                'rgba(153, 102, 255, 0.2)',
															                'rgba(255, 159, 64, 0.2)',
															              ],
															              borderColor: [
															                'rgba(255, 99, 132, 1)',
															                'rgba(54, 162, 235, 1)',
															                'rgba(255, 206, 86, 1)',
															                'rgba(75, 192, 192, 1)',
															                'rgba(153, 102, 255, 1)',
															                'rgba(255, 159, 64, 1)',
															              ],
															              borderWidth: 1,
											},
															            
											],
									}

	
	const rSubmitDate = () => {

		if(!rStart || !rEnd){
			alert.error("Invalid Input, Empty Date")
		}else{
			if(rStart>rEnd){
				alert.error("Invalid Input, Start Date is Ahead of End Date")
			}
			else{
				dispatch(getRescuedMonthly(rStart,rEnd))
			}

		}

	}


	const aSubmitDate = () => {
		console.log(aStart)
		console.log(aEnd)
		if(!aStart || !aEnd){
			alert.error("Invalid Input, Empty Date")
		}else{
			if(aStart>aEnd){
				alert.error("Invalid Input, Start Date is Ahead of End Date")
			}
			else{
				dispatch(getAdoptedMonthly(aStart,aEnd))
			}

		}

	}




	const rReset = () => {

		
				dispatch(getRescuedMonthly())
		

	}

	const aReset = () => {

		
				dispatch(getAdoptedMonthly())
		

	}




	return(
					<Fragment>
				  	<Header/>
		    			<MetaData title={'Dashboard'} />
		    			 <div className="row" style={{width:"100%"}}>
		                <div className="col-12 col-md-2">
		                    <Sidebar />
		                </div>



		                <div className="col-12 col-md-10"  style={{padding:"24px"}}>

		                <div className="row justify-content-center" style={{width:"100%"}}>
		                	
		                	
		                	<div className="col-md-3 adminCard" style={{backgroundColor:"#3d4d76", color:"white"}}>
		                	<Link to="/admin/users" style={{color:"white", textDecoration:"none"}}>
			                	<div className="row" style={{width:"100%"}}>
				                	<div className="col-md-10">
				                	<FontAwesomeIcon style={{fontSize:"30px", marginBottom:"12px"}} icon={faUsers} />
				                	<br/>
				                		<b>Users</b><br/>
				                		<small style={{fontSize:"11px", color:"#d6dae4"}}>Total number of users</small>
				                	</div>
				                	<div className="col-md-2" style={{paddingTop:"5px"}}>
				                			<h2>{users.length}</h2>
				                	</div>
			                	</div>
			                	</Link>

		                	</div>
		                	

		                	<div className="col-md-3 adminCard" style={{backgroundColor:"#27cee9", color:"white"}}>
			                	<Link to="/admin/animals" style={{color:"white", textDecoration:"none"}}>
			                	<div className="row" style={{width:"100%"}}>
				                	<div className="col-md-10">
				                	<FontAwesomeIcon style={{fontSize:"30px", marginBottom:"12px"}} icon={faPaw} />
				                	<br/>
				                		<b>Rescued</b><br/>
				                		<small style={{fontSize:"11px", color:"white"}}>Total number of rescued animal</small>
				                	</div>
				                	<div className="col-md-2" style={{paddingTop:"5px"}}>
				                			
				                			{allRescued && <h2> {allRescued}</h2>}
				                	</div>
			                	</div>
			                	</Link>
		                	</div>


		                	<div className="col-md-3 adminCard" style={{backgroundColor:"#13a768", color:"white"}}>
		                	<Link to="/admin/animals/adopted" style={{color:"white", textDecoration:"none"}}>
			                	<div className="row" style={{width:"100%"}}>
				                	<div className="col-md-10">
				                	<FontAwesomeIcon style={{fontSize:"30px", marginBottom:"12px"}} icon={faHandHoldingHand} />
				                	<br/>
				                		<b>Adopted</b><br/>
				                		<small style={{fontSize:"11px", color:"white"}}>Total number of adopted animal</small>
				                	</div>
				                	<div className="col-md-2" style={{paddingTop:"5px"}}>
				                		{allAdopted && <h2> {allAdopted}</h2>}		
				                	</div>
			                	</div>
			                </Link>
		                	</div>

		                </div>
		               
		               
		                <br/>
		                <div className="row" style={{width:"100%", paddingRight:"100px", paddingLeft:"100px",}}>
		                		
		                	<div className="col-md-6">
		                	<h5>Rescued Monthly</h5>
		               		<div className="row" style={{width:"100%"}} >
		      					<div className="col-md-4">
		      					<br/>
		      					<input type="date" style={{height:"30px",  width:"125px", fontSize:"11px"}} name="rStart" onChange={(e)=>setRstart(e.target.value)} defaultValue={rStart} className="form-control"/>
		      					</div>
		      					<div className="col-md-4">
		      					<br/>
		      					<input type="date" style={{height:"30px", width:"125px", fontSize:"11px"}} name="rEnd" onChange={(e)=>setRend(e.target.value)} defaultValue={rEnd} className="form-control"/>
		      					</div>
		      					<div className="col-md-4" style={{padding:"0px"}}>
		      					<br/>
								<button className="btn" onClick={rReset}
									style={{float:"right", marginLeft:"3px", backgroundColor:"#33cabb", color:"white", position:"relative",   height:"30px", fontSize:"12px"}}>Reset
								</button>
								&nbsp;
								<button className="btn" onClick={rSubmitDate}
									style={{float:"right", marginLeft:"3px", backgroundColor:"#33cabb", color:"white", position:"relative", height:"30px",  fontSize:"12px"}}>Apply
								</button>
								</div>
      						</div>
      						<br/>


		                    <Fragment>             		
		                      		{ rLoading?<Loader/>:<Bar
													        data={rescuedData}
														        height={500}
														        width={1000}
														        options={{
														          maintainAspectRatio: true,
														           scales: {
														            yAxes: [
														              {
														                ticks: {
														                  beginAtZero: true,
														                },
														              },
														            ],
														          },
														          legend: {
														            labels: {
														              fontSize: 25,
														            },
														          },
														        }}
      													/>
      												}


      													<div>
      														
      													</div>
		                    </Fragment>

		                    </div>



		                   

		                    <div className="col-md-6">
		                    <h5>Adopted Monthly</h5>
		                    <div className="row" style={{width:"100%"}} >		               						 				
		      					<div className="col-md-4">
		      					<br/>
		      					<input type="date" style={{height:"30px", width:"125px", fontSize:"11px"}} name="aStart" onChange={(e)=>setAstart(e.target.value)} defaultValue={aStart} className="form-control"/>
		      					</div>
		      					<div className="col-md-4">
		      					<br/>
		      					<input type="date" style={{height:"30px", width:"125px", fontSize:"11px"}} name="aEnd" onChange={(e)=>setAend(e.target.value)} defaultValue={aEnd} className="form-control"/>
		      					</div>

		      					<div className="col-md-4" style={{padding:"0px"}}>
		      					<br/>
		      					<button className="btn" 
			      					onClick={aSubmitDate}
			                        style={{float:"right", marginLeft:"3px", backgroundColor:"#33cabb", color:"white", position:"relative", height:"30px",  fontSize:"12px"}}>Apply
		                        </button>
		                           &nbsp;
		                        <button className="btn" 
			      					onClick={aReset}
			                        style={{float:"right", marginLeft:"3px", backgroundColor:"#33cabb", color:"white", position:"relative",   height:"30px", fontSize:"12px"}}>Reset
		                        </button>
		      					</div>							
      						</div>
      						<br/>

		                     <Fragment>             		
		                      		{ aLoading?<Loader/>:<Bar
													        data={adoptedData}
														        height={500}
														        width={1000}
														        options={{
														          maintainAspectRatio: true,
														           scales: {
														            yAxes: [
														              {
														                ticks: {
														                  beginAtZero: true,
														                },
														              },
														            ],
														          },
														          legend: {
														            labels: {
														              fontSize: 25,
														            },
														          },
														        }}
      													/>
      												}


      													<div>
      														
      													</div>
		                    </Fragment>
		                    </div>

		                   </div>
		                </div>
		            </div>
		    		</Fragment>
		)
}

export default Dashboard