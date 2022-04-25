import React,{ Fragment, useEffect, useState} from 'react'
import MetaData from './layout/MetaData'

import {useDispatch, useSelector} from 'react-redux'
import {getAnimals} from '../actions/animalActions'
import Loader from './layout/Loader'
import Animal from '../components/animal/Animal'
import 'rc-slider/assets/index.css';
import {useAlert} from 'react-alert'
import {useParams, useNavigate} from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/admin/Sidebar'

import { loadUser } from '../actions/userActions'
import DotLoader from './layout/DotLoader'
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider from 'rc-slider'
import Pagination from 'react-js-pagination'
import { Carousel } from 'react-bootstrap'


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)


const Home = () => {
		const [allAnimals, setAllAnimals] = useState([])
		const [currentPage, setCurrentPage] = useState(1)
		const [searched, setSearched] = useState(0)
		const [word, setWord] = useState(0)

		const [category, setCategory] = useState('')
		const [gender, setGender] = useState('')
		const [breed, setBreed] = useState('')
		const [age, setAge] = useState([1, 10])

		// const [currentPage, setCurrentPage] = useState(1)



	const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, animals, error, animalsCount, filteredAnimalCount, allBreeds, resPerPage} = useSelector(state => state.animals)
    const {user} = useSelector(state => state.auth)
   

    let {keyword} = useParams();

    let navigate = useNavigate()

    const fetchMoreData = () => {
         setTimeout(() => {
            let add = 0

           if(animals.length >= allAnimals.length+4){
                add = 4
           }else{
                add = animals.length - allAnimals.length
           }

           const counter = allAnimals.length + add 

           setAllAnimals(animals.slice(0,counter))

           	// {console.log(allAnimals)}
         }, 1500);

      };

   

    useEffect(()=>{
    	
    	 
	    	// if (localStorage.getItem("isAuthenticated")&&!user) {
	     //      dispatch(loadUser())     
	    	// }
    	
    	// console.log(user)
    	// dispatch(getAnimals(keyword, 1));

      if(error){
         alert.success('success')
         return alert.error("error")
        }


      if(keyword&&searched===0){
      	dispatch(getAnimals(keyword, currentPage));	
      	setSearched(1)
      }


    	 if(animals&&word!== keyword){
       	dispatch(getAnimals(keyword,currentPage));
       	setWord(keyword)
       }


      if(!keyword&&animalsCount!==filteredAnimalCount){
      	setSearched(0)
      	dispatch(getAnimals(keyword, currentPage));
      } 

      if(animals&&searched===0){

      	setAllAnimals(animals.slice(0,12))
      }



      if(animals&&animals.length<1){
       	if(!keyword){
          dispatch(getAnimals(keyword, 1));
          	}
    	}
    		
    	if(animals&&allAnimals.length<1){
    			setAllAnimals(animals.slice(0,12))
    	}
    	// console.log(category)
    	// console.log(keyword&&searched===0)
    	// console.log(animals&&word!== keyword)
    	// console.log(!keyword&&animalsCount!==filteredAnimalCount)
    	// console.log(animals&&searched===0)

    }, [dispatch, alert, error, keyword, user, animals, currentPage]);




    useEffect(() => {
       
        dispatch(getAnimals(keyword, currentPage, category, gender, breed, age));
    }, [category, gender, breed, age, currentPage])


    //  useEffect(() => {
       
    //     dispatch(getAnimals(keyword, currentPage, category, gender, breed, age));
      

    // }, [currentPage])


    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = animalsCount;
    if (keyword) {
        count = filteredAnimalCount
    }

    let ac = 0;
   

	return(
		<Fragment>
      { loading ? <Loader/> : (
			<Fragment>
			{/*{console.log("word is =-", word!== keyword)}*/}
	{/*		{console.log("searched-", searched)}*/}
			{/*{console.log("animals-", animals)}*/}
			<Header/>
			 <MetaData title={'Adopt Healthy Animals'} />
				<div>
					<div className="row justify-content-center">
						{user&&user.role === "personnel"?
						<div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            :<div></div>}

                        
                         {!keyword&&user&&user.role === "user"&&
                            
                                        <Carousel pause='hover'>
                                                 <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/2caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/1caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                               
                                        </Carousel>
                                  

                        }
                        {!keyword&&user&&user.role === "adopter"&&
                            
                                        <Carousel pause='hover'>
                                                 <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/2caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/1caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                               
                                        </Carousel>
                                  

                        }
                        
                        {console.log()}
                        {!keyword&&!localStorage.getItem('isAuthenticated')&&
                            
                                         <Carousel pause='hover'>
                                                 <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/2caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/1caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                        </Carousel>
                        }
                                  

                    





						 <div className="col-12 col-md-10">
                            {!keyword&&user&&user.role === "personnel"&&
                            
                                        <Carousel pause='hover'>
                                                 <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/2caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                                <Carousel.Item >
                                                    <img className="d-block w-100" src="/images/1caro.png" alt="images" style={{ height:"700px", objectFit:"cover"}}/>
                                                </Carousel.Item>
                                               
                                        </Carousel>
                                  

                            }
							{!keyword&&	
                                <Fragment>
                                


						 				<InfiniteScroll 
						 				style={{overflow:"hidden"}}
						 					dataLength={allAnimals.length} 
						 					next={fetchMoreData} 
						 					hasMore={allAnimals.length >= animals.length? false:true} 
						 					loader={<h4><DotLoader/></h4>} 
						 					endMessage={
						 						<p style={{ textAlign: 'center' }}>
						 						<b>Yay! You have seen it all</b>
						 						 </p>
						 						}
						 						>
						 				<div className="row justify-content-center">
										{allAnimals && allAnimals.map(animal => {
											if (animal.sicks == false && animal.adopt.adoptStatus === "unAdopt"){
												ac++;
												return(
							                  	   <Animal key={animal._id } animal={animal} />
							                    )
											}
										}
										)}
										</div>
										 </InfiniteScroll>
                                </Fragment>
							}





							{keyword&&
								<div className="row">
								{console.log(category)}


								<div className="col-md-2">
									<div style={{background:"white",boxShadow:"2px 2px 6px #dfdfdf", padding:"24px", marginTop:"30px"}}>
									<label><h5>Category</h5></label><br/>
												<input
                                        type="radio"
                                        id="category_field"
                                        name="category"
                                        defaultValue=""
                                        checked={!category? true:""}
                                        onChange={(e) => setCategory('')}
                                    /> All <br/>
											   <input
                                        type="radio"
                                        id="category_field"
                                        name="category"
                                        defaultValue="Dog"
                                        checked={category === "Dog"? true:""}
                                        onChange={(e) => setCategory(e.target.value)}
                                    /> Dog<br/>
                                    <input
                                        type="radio"
                                        id="category_field"
                                        name="category"
                                        defaultValue="Cat"
                                        checked={category === "Cat"? true:""}
                                        onChange={(e) => setCategory(e.target.value)}
                                    /> Cat<br/><br/>
                        
                           <label><h5>Gender</h5></label><br/>
                           			<input
                                        type="radio"
                                        id="gender_field"
                                        name="gender"
                                        defaultValue=""
                                        checked={!gender? true:""}
                                        onChange={(e) => setGender('')}
                                    /> All <br/>
											   <input
                                        type="radio"
                                        id="gender_field"
                                        name="gender"
                                        defaultValue="male"
                                        checked={gender === "male"? true:""}
                                        onChange={(e) => setGender(e.target.value)}
                                    /> Male <br/>
                                    <input
                                        type="radio"
                                        id="gender_field"
                                        name="gender"
                                        defaultValue="female"
                                        checked={gender === "female"? true:""}
                                        onChange={(e) => setGender(e.target.value)}
                                    /> Female <br/><br/>

                           <label><h5>Breed</h5></label><br/>
                           	<select onChange={e=>setBreed(e.target.value)} defaultValue={breed} className="form-control">
                           		<option value=""></option>
                           		{
                           			allBreeds&&allBreeds.map(breed=>(
                           				<option key={breed} value={breed}>{breed}</option>
                           				))
                           		}
                           	</select>
                           	<br/>
                           	<br/>



                           	<label><h5>Age</h5></label><br/>
                         

                           	<Range 
                                                marks={{
                                                    0: `0`,
                                                    10: `10`
                                                }}
                                                min={0}
                                                max={10}
                                                defaultValue={[0, 10]}
                                                tipFormatter={value => `${value}`}
                                                tipProps={{
                                                    placement: "bottom",
                                                    visible: true
                                                }}
                                                defaultValue={age}
                                                onChange={a => setAge(a)}
                                            /><br/>
                          

								</div>
							</div>



								<div className="col-md-10">
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

							{/*{resPerPage <= count && (*/}
								<div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={animalsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                        {/*)}*/}


									</div>
								</div>
								</div>
							}	

							<br/>
							<br/>
									
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