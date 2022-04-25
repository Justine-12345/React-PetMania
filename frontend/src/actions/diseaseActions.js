import axios from 'axios';
import { ALL_DISEASE_REQUEST,
  ALL_DISEASE_SUCCESS, 
  ALL_DISEASE_FAIL,

  NEW_DISEASE_REQUEST,
  NEW_DISEASE_SUCCESS,
  NEW_DISEASE_FAIL,

  UPDATE_DISEASE_REQUEST,
  UPDATE_DISEASE_SUCCESS,
  UPDATE_DISEASE_FAIL,

  DISEASE_DETAILS_REQUEST,
  DISEASE_DETAILS_SUCCESS,
  DISEASE_DETAILS_FAIL,

  DELETE_DISEASE_REQUEST,
  DELETE_DISEASE_SUCCESS,
  DELETE_DISEASE_FAIL,

  CLEAR_ERRORS 
 } from '../constants/diseaseConstants'


 export const getSicks = () => async (dispatch) => {
  try{
      dispatch({
        type:ALL_DISEASE_REQUEST
      })

      const {data} = await axios.get(`/api/v1/sicks`)
          
       dispatch({
         type: ALL_DISEASE_SUCCESS,
         payload: data
     })
  }
   catch(error) {
     dispatch({
         type: ALL_DISEASE_FAIL,
         payload: error.response.data.message
     })
   }
}


export const newSick = (diseaseData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_DISEASE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/sick/new`, diseaseData, config)

        dispatch({
            type: NEW_DISEASE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_DISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateSick = (id, diseaseData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DISEASE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/sick/${id}`, diseaseData, config)

        dispatch({
            type: UPDATE_DISEASE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_DISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getSickDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: DISEASE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/sick/${id}`)

        dispatch({
            type: DISEASE_DETAILS_SUCCESS,
            payload: data.sick
        })

    } catch (error) {
        dispatch({
            type: DISEASE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteSick = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_DISEASE_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/sick/${id}`)

        dispatch({
            type: DELETE_DISEASE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_DISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}