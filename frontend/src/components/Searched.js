import React,{ Fragment, useEffect, useState} from 'react'
import MetaData from './layout/MetaData'

import {useDispatch, useSelector} from 'react-redux'
import {getAnimals} from '../actions/animalActions'
import Loader from './layout/Loader'
import Animal from '../components/animal/Animal'

import {useAlert} from 'react-alert'
import {useParams} from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/admin/Sidebar'

import { loadUser } from '../actions/userActions'
import DotLoader from './layout/DotLoader'
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, animals, error, animalsCount, filteredAnimalCount} = useSelector(state => state.animals)
    const {user} = useSelector(state => state.auth)
    let {keyword} = useParams();



    useEffect(()=>{
    		
    		if(keyword){
          dispatch(getAnimals(keyword, 1));
    		}
    		
    }, [dispatch, alert, error, keyword, user]);

    let ac = 0;
   

	return(
		<Fragment>
      { loading ? <Loader/> : (
			<Fragment>
			{console.log(animals)}
			<Header/>
			 <MetaData title={'Adopt Healthy Animals'} />
				<div>
					<div className="row justify-content-center">
						{user&&user.role === "personnel"?
						<div className="col-12 col-md-2">
                    <Sidebar />
            </div>
            :<div></div>}

						 <div className="col-12 col-md-10">
						 				<div className="row justify-content-center">
										{animals && animals.map(animal => {
											if (animal.sicks == false && animal.adopt.adoptStatus === "unAdopt"){
												ac++;
												return(
							                  	   <Animal key={animal._id } animal={animal} />
							                    )
											}
										}
										)}
										</div>

									{ac == 0 ? <b>No result</b>:""}
									</div>
							</div>
					</div>

			</Fragment>
			  )
    }
    </Fragment>
		)
}

export default Home