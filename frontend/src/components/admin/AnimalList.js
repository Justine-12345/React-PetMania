import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {getAnimals, deleteAnimal, adoptAccept, adoptDecline, clearErrors} from '../../actions/animalActions'
import { Link, useNavigate,useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEye, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { DELETE_ANIMAL_RESET } from '../../constants/animalConstants'
import Header from '../../components/layout/Header'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const AnimalList = () =>{

	const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, animals, error} = useSelector(state => state.animals)
    const { error: deleteError, isDeleted } = useSelector(state => state.animal)
    const { error: acceptError, isAccept, loading:acceptLoading } = useSelector(state => state.adoptAccept)
     const { error: declineError, isDecline, loading:declineLoading } = useSelector(state => state.adoptDecline)

    let navigate = useNavigate()
    let {filterAdoption} = useParams()

     useEffect(()=>{
      if(error){
         return alert.error("error")
        }  
        if(deleteError){
         return alert.error(deleteError)
        }  


         if(acceptError){
         return alert.error(acceptError)
        }  

         if(declineError){
         return alert.error(declineError)
        }  
      

         if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Animal deleted successfully');
            navigate('/admin/animals');
            dispatch({ type: DELETE_ANIMAL_RESET })
        }

        if (isAccept) {
            alert.success('Animal Adoption Accepted successfully');
            navigate('/admin/animals');
            dispatch({ type: "ADOPT_ACCEPT_RESET" })
        }
        
        if (isDecline) {
            alert.success('Animal Adoption Cancelled');
            navigate('/admin/animals');
            dispatch({ type: "ADOPT_DECLINE_RESET" })
        }

      dispatch(getAnimals());

    }, [dispatch,deleteError, isDeleted,isAccept,isDecline, alert, error, navigate, deleteError, acceptError, declineError]);


     const setAnimals = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Breed',
                    field: 'breed',
                    sort: 'asc'
                },
                {
                    label: 'Gender',
                    field: 'gender',
                    sort: 'asc'
                },
                {
                    label: 'Health',
                    field: 'health',
                    sort: 'asc'
                },
                {
                    label: 'Adopt Status',
                    field: 'adopt',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        

        animals.forEach(animal => {
            
            if(filterAdoption){
                
                if(animal.adopt.adoptStatus === filterAdoption){
                     data.rows.push({
                        id: animal._id,
                        name: animal.name,
                        category: animal.category,
                        breed:animal.breed,
                        gender:animal.gender,
                        health: animal.health === "healthy"
                            ? <p style={{ color: 'green' }}><b>{animal.health}</b></p>
                            : <p style={{ color: 'red' }}>{animal.health} ({animal.sicks.length})</p>,
                        adopt: <span> {animal.adopt.adoptStatus} {animal.adopt.adoptStatus === 'pending'&&
                                <Fragment>
                                <button disabled={acceptLoading?true:false} className="btn btn-success py-1 px-2 ml-2" onClick={() => acceptAnimalHandler(animal._id)}>
                                <FontAwesomeIcon icon={faCheck} />
                                </button>
                                
                                <button disabled={declineLoading?true:false} className="btn btn-danger py-1 px-2 ml-2" onClick={() => declineAnimalHandler(animal._id,animal.adopt.adopter._id)}>
                                <FontAwesomeIcon icon={faX} />
                                </button>
                                </Fragment>
                            }</span> ,
                        actions: 
                        <Fragment>

                            <Link to={`/animal/${animal._id}`} className="btn btn-success py-1 px-2">
                               <FontAwesomeIcon icon={faEye} />
                            </Link>
                            &nbsp;

                            <Link to={`/admin/animal/update/${animal._id}`} className="btn btn-primary py-1 px-2">
                               <FontAwesomeIcon icon={faPen} />
                            </Link>
                          
                            

                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAnimalHandler(animal._id)}>
                            <i className="fa fa-trash"></i>
                            </button>
                            
                        </Fragment>
                    })
               }

            }
            else{
                 data.rows.push({
                    id: animal._id,
                    name: animal.name,
                    category: animal.category,
                    breed:animal.breed,
                    gender:animal.gender,
                    health: animal.health === "healthy"
                        ? <p style={{ color: 'green' }}><b>{animal.health}</b></p>
                        : <p style={{ color: 'red' }}>{animal.health} ({animal.sicks.length})</p>,
                    adopt:<span> {animal.adopt.adoptStatus} {animal.adopt.adoptStatus === 'pending'&&
                               <Fragment>
                                <button disabled={acceptLoading?true:false} className=" btn btn-success py-1 px-2 ml-2" onClick={() => acceptAnimalHandler(animal._id)}>
                                <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button disabled={declineLoading?true:false} className="btn btn-danger py-1 px-2 ml-2" onClick={() => declineAnimalHandler(animal._id,animal.adopt.adopter._id)}>
                                <FontAwesomeIcon icon={faX} />
                                </button>
                                </Fragment>
                            }</span> ,
                    actions: 
                    <Fragment>

                        <Link to={`/animal/${animal._id}`} className="btn btn-success py-1 px-2">
                           <FontAwesomeIcon icon={faEye} />
                        </Link>
                        &nbsp;

                        <Link to={`/admin/animal/update/${animal._id}`} className="btn btn-primary py-1 px-2">
                           <FontAwesomeIcon icon={faPen} />
                        </Link>
                      
                        

                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAnimalHandler(animal._id)}>
                        <i className="fa fa-trash"></i>
                        </button>

                        

                    </Fragment>
                })
            }



        })

        return data;
    }

    const deleteAnimalHandler = (id) => {
         confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>You want to delete this animal?</p>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                    dispatch(deleteAnimal(id))
                    onClose();
                  }}
                >
                  Yes, Delete it!
                </button>
              </div>
            );
          }
        });
        
    }
    
    const acceptAnimalHandler = (id) => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>You want to accept this adopt request?</p>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                    dispatch(adoptAccept(id))
                    onClose();
                  }}
                >
                  Yes, Accept it!
                </button>
              </div>
            );
          }
        });

        
    }

    const declineAnimalHandler = (id, user) => {
     
       confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>You want to reject this adopt request?</p>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                    dispatch(adoptDecline(id,user))
                    onClose();
                  }}
                >
                  Yes, Reject it!
                </button>
              </div>
            );
          }
        });


    }

    return(
    		<Fragment>
    			<MetaData title={'All Animals'} />
                <Header/>
    			 <div className="row" style={{width:"100%"}}>
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Animals</h1>
                     
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setAnimals()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>



    		</Fragment>
    	)
}

export default AnimalList;