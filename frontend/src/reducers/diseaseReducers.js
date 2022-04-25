import { ALL_DISEASE_REQUEST,
  ALL_DISEASE_SUCCESS, 
  ALL_DISEASE_FAIL,

  NEW_DISEASE_REQUEST,
  NEW_DISEASE_SUCCESS,
  NEW_DISEASE_FAIL,
  NEW_DISEASE_RESET,

  UPDATE_DISEASE_REQUEST,
  UPDATE_DISEASE_SUCCESS,
  UPDATE_DISEASE_FAIL,
  UPDATE_DISEASE_RESET,

  DISEASE_DETAILS_REQUEST,
  DISEASE_DETAILS_SUCCESS,
  DISEASE_DETAILS_FAIL,
  DISEASE_DETAILS_RESET,

  DELETE_DISEASE_REQUEST,
  DELETE_DISEASE_SUCCESS,
  DELETE_DISEASE_FAIL,
  DELETE_DISEASE_RESET,

  CLEAR_ERRORS 
 } from '../constants/diseaseConstants'


export const diseasesReducer = (state = {disease:[]}, action) => {
  switch(action.type){
      case ALL_DISEASE_REQUEST:
      // console.log(state)
            return{
              loading: true,
              disease:[]
            }

      case ALL_DISEASE_SUCCESS:
        // console.log(state)
            return{
              loading:false,
              disease:action.payload.sicks,
              sicksCount: action.payload.sicksCount
            }

      case ALL_DISEASE_FAIL:
            return{
              loading:false,
              error:action.payload
            }

      case CLEAR_ERRORS:
            return{
              ...state,
              error:null
            }
      default:
            return state;

  }
}

export const newDiseaseReducer = (state = { disease: {} }, action) => {
    switch (action.type) {

        case NEW_DISEASE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_DISEASE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                disease: action.payload.sicks
            }

        case NEW_DISEASE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_DISEASE_RESET:
            return {
                ...state,
                success: false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}




export const diseaseReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_DISEASE_REQUEST:
        case UPDATE_DISEASE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_DISEASE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_DISEASE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_DISEASE_FAIL:
        case UPDATE_DISEASE_FAIL:
            return {
                ...state,
                error: action.payload
            }

         case DELETE_DISEASE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_DISEASE_RESET:
            return {
                ...state,
                isUpdated: false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}



export const diseaseDetailsReducer = (state = { disease: {} }, action) => {
    switch (action.type) {

        case DISEASE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DISEASE_DETAILS_SUCCESS:
            return {
                loading: false,
                disease: action.payload
            }

        case DISEASE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DISEASE_DETAILS_RESET:
            return {
                ...state,
                 disease: undefined
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}