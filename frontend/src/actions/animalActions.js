import axios from 'axios';
import { ALL_ANIMALS_REQUEST,
  ALL_ANIMALS_SUCCESS, 
  ALL_ANIMALS_FAIL,

  NEW_ANIMAL_REQUEST,
  NEW_ANIMAL_SUCCESS,
  NEW_ANIMAL_FAIL,

  UPDATE_ANIMAL_REQUEST,
  UPDATE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_FAIL,

  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCCESS,
  ANIMAL_DETAILS_FAIL,

  DELETE_ANIMAL_REQUEST,
  DELETE_ANIMAL_SUCCESS,
  DELETE_ANIMAL_FAIL,

  MONTHLY_RESCUED_ANIMAL_REQUEST,
  MONTHLY_RESCUED_ANIMAL_SUCCESS,
  MONTHLY_RESCUED_ANIMAL_RESET,
  MONTHLY_RESCUED_ANIMAL_FAIL, 

  MONTHLY_ADOPTED_ANIMAL_REQUEST,
  MONTHLY_ADOPTED_ANIMAL_SUCCESS,
  MONTHLY_ADOPTED_ANIMAL_RESET,
  MONTHLY_ADOPTED_ANIMAL_FAIL,

  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAIL,

  ADOPT_REQUEST,
  ADOPT_SUCCESS,
  ADOPT_RESET,
  ADOPT_FAIL,

  ADOPT_ACCEPT_REQUEST,
  ADOPT_ACCEPT_SUCCESS,
  ADOPT_ACCEPT_RESET,
  ADOPT_ACCEPT_FAIL,

  ADOPT_DECLINE_REQUEST,
  ADOPT_DECLINE_SUCCESS,
  ADOPT_DECLINE_RESET,
  ADOPT_DECLINE_FAIL,

  CLEAR_ERRORS 
 } from '../constants/animalConstants'



export const getAnimals = (keyword='', currentPage=1, category='', gender='', breed='', age) => async (dispatch) => {
  try{
      dispatch({
        type:ALL_ANIMALS_REQUEST
      })

        let categoryQ = '';
        let genderQ = '';
        let breedQ = '';
        let ageQ =''

        if (category){
            categoryQ = `&category=${category}`
        }

        if (gender){
            genderQ = `&gender=${gender}`
        }

        if (breed){
            breedQ = `&breed=${breed}`
        }

        if (age){
           ageQ = `&age[lte]=${age[1]}&age[gte]=${age[0]}`
        }
       

        
        let link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}${categoryQ}${genderQ}${breedQ}${ageQ}`
            
        // if(category){
        //     link = `/api/v1/animals?keyword=${keyword}`
        // }

          
        
        const {data} = await axios.get(link)
        // console.log("data",data)
        // console.log("link", link)


       dispatch({
         type: ALL_ANIMALS_SUCCESS,
         payload: data
     })
  }
   catch(error) {
     dispatch({
         type: ALL_ANIMALS_FAIL,
         payload: error.response.data.message
     })
   }
}


export const newAnimal = (animalData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ANIMAL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/animal/new`, animalData, config)

        dispatch({
            type: NEW_ANIMAL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}



// Update Product (ADMIN)
export const updateAnimal = (id, animalData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ANIMAL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/animal/${id}`, animalData, config)

        dispatch({
            type: UPDATE_ANIMAL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAnimalDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ANIMAL_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/animal/${id}`)

        dispatch({
            type: ANIMAL_DETAILS_SUCCESS,
            payload: data.animal
        })

    } catch (error) {
        dispatch({
            type: ANIMAL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteAnimal = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ANIMAL_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/animal/${id}`)

        dispatch({
            type: DELETE_ANIMAL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getRescuedMonthly = (start='', end='') => async (dispatch) => {
  try{
      dispatch({
        type:MONTHLY_RESCUED_ANIMAL_REQUEST
      })

      const {data} = await axios.get(`/api/v1/admin/monthly-rescued?start=${start}&end=${end}`)

       dispatch({
         type: MONTHLY_RESCUED_ANIMAL_SUCCESS,
         payload: data
     })
  }
   catch(error) {
     dispatch({
         type: MONTHLY_RESCUED_ANIMAL_FAIL,
         payload: error.response.data.message
     })
   }
}




export const getAdoptedMonthly = (start='', end='') => async (dispatch) => {
  try{
      dispatch({
        type:MONTHLY_ADOPTED_ANIMAL_REQUEST
      })

      const {data} = await axios.get(`/api/v1/admin/monthly-adopted?start=${start}&end=${end}`)

       dispatch({
         type: MONTHLY_ADOPTED_ANIMAL_SUCCESS,
         payload: data
     })
  }
   catch(error) {
     dispatch({
         type: MONTHLY_ADOPTED_ANIMAL_FAIL,
         payload: error.response.data.message
     })
   }
}




export const newComment = (commentData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COMMENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/animal/comment/`, commentData, config)

        dispatch({
            type: NEW_COMMENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const adopt = (animalId) => async (dispatch) => {
    try {

        dispatch({ type: ADOPT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/adopt/animal/${animalId}`, config)

        dispatch({
            type: ADOPT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ADOPT_FAIL,
            payload: error.response.data.message
        })
    }
}



export const adoptAccept = (animalId) => async (dispatch) => {
    try {

        dispatch({ type: ADOPT_ACCEPT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/adopt-accept/animal/${animalId}`, config)

        dispatch({
            type: ADOPT_ACCEPT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ADOPT_ACCEPT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const adoptDecline = (animalId, userId) => async (dispatch) => {
    try {

        dispatch({ type: ADOPT_DECLINE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/adopt-decline/animal/${animalId}/${userId}`, config)

        dispatch({
            type: ADOPT_DECLINE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ADOPT_DECLINE_FAIL,
            payload: error.response.data.message
        })
    }
}





export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}