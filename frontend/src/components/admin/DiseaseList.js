import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {getSicks, deleteSick, clearErrors} from '../../actions/diseaseActions'
import { Link, useNavigate,useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons'
import { DELETE_DISEASE_RESET } from '../../constants/diseaseConstants'
import store from '../../store';
import Header from '../../components/layout/Header'
const DiseaseList = () =>{

	const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, disease, error} = useSelector(state => state.diseases)
    const { error: deleteError, isDeleted } = useSelector(state => state.disease)
    

    let navigate = useNavigate()

     useEffect(()=>{
      if(error){
         alert.success('success')
         return alert.error("error")
        }  

         if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Disease deleted successfully');
            navigate('/admin/diseases');
            dispatch({ type: DELETE_DISEASE_RESET })
        }
       

      dispatch(getSicks());
      console.log(disease)
      console.log("GoldenState",store.getState().diseases)

    }, [dispatch,deleteError, isDeleted, alert, error, navigate]);


     const setDisease = () => {
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
                    label: 'Description',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        

        {disease && disease.forEach(di => {
            
                 data.rows.push({
                    id: di._id,
                    name: di.name,
                    description: <p className="ellipse">{di.description}</p>,
                    actions: 
                    <Fragment>
                        <Link to={`/disease/${di._id}`} className="btn btn-success py-1 px-2">
                           <FontAwesomeIcon icon={faEye} />
                        </Link>
                        &nbsp;

                        <Link to={`/admin/disease/update/${di._id}`} className="btn btn-primary py-1 px-2">
                           <FontAwesomeIcon icon={faPen} />
                        </Link>
                      
                        

                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteDiseaseHandler(di._id)}>
                        <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                })
        })}

        return data;
    }

    const deleteDiseaseHandler = (id) => {
        dispatch(deleteSick(id))
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
                        <h1 className="my-5">All Disease</h1>
                     
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setDisease()}
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

export default DiseaseList;