import { ALL_ANIMALS_REQUEST,
  ALL_ANIMALS_SUCCESS, 
  ALL_ANIMALS_FAIL,

  NEW_ANIMAL_REQUEST,
  NEW_ANIMAL_SUCCESS,
  NEW_ANIMAL_FAIL,
  NEW_ANIMAL_RESET,

  UPDATE_ANIMAL_REQUEST,
  UPDATE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_FAIL,
  UPDATE_ANIMAL_RESET,

  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCCESS,
  ANIMAL_DETAILS_FAIL,
  ANIMAL_DETAILS_RESET,

  DELETE_ANIMAL_REQUEST,
  DELETE_ANIMAL_SUCCESS,
  DELETE_ANIMAL_FAIL,
  DELETE_ANIMAL_RESET,

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
  NEW_COMMENT_RESET,

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


export const animalsReducer = (state = {animals:[]}, action) => {
  switch(action.type){
      case ALL_ANIMALS_REQUEST:
            return{
              loading: true,
              animals:null
            }

      case ALL_ANIMALS_SUCCESS:
            return{
              loading:false,
              animals:action.payload.animals,
              animalsCount: action.payload.animalsCount,
              filteredAnimalCount: action.payload.filteredAnimalCount,
              allBreeds: action.payload.allBreeds,

              resPerPage: action.payload.resPerPage
            }

      case ALL_ANIMALS_FAIL:
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



export const newAnimalReducer = (state = { animal: {} }, action) => {
    switch (action.type) {

        case NEW_ANIMAL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ANIMAL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                animal: action.payload.animal
            }

        case NEW_ANIMAL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ANIMAL_RESET:
            return {
                ...state,
                success: false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                loading: false
            }
        default:
            return state
    }
}


export const animalReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ANIMAL_REQUEST:
        case UPDATE_ANIMAL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ANIMAL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ANIMAL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ANIMAL_FAIL:
        case UPDATE_ANIMAL_FAIL:
            return {
                ...state,
                error: action.payload
            }

         case DELETE_ANIMAL_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ANIMAL_RESET:
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



export const animalDetailsReducer = (state = { animal: {} }, action) => {
    switch (action.type) {

        case ANIMAL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ANIMAL_DETAILS_SUCCESS:
            return {
                loading: false,
                animal: action.payload
            }

        case ANIMAL_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ANIMAL_DETAILS_RESET:
            return {
                ...state,
                 animal: undefined
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



export const animalsMonthlyRescuedReducer = (state = {}, action) => {
  switch(action.type){
      case MONTHLY_RESCUED_ANIMAL_REQUEST:
            return{
              loading: true,
              rescuedMonthName:[],
              rescuedMonthValue:[]
            }

      case MONTHLY_RESCUED_ANIMAL_SUCCESS:
            return{
              loading:false,
              rescuedMonthName:action.payload.rescuedMonthName,
              rescuedMonthValue: action.payload.rescuedMonthValue,
            }

      case MONTHLY_RESCUED_ANIMAL_FAIL:
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


export const animalsMonthlyAdoptedReducer = (state = {}, action) => {
  switch(action.type){
      case MONTHLY_ADOPTED_ANIMAL_REQUEST:
            return{
              loading: true,
              adoptedMonthName:[],
              adoptedMonthValue:[]
            }

      case MONTHLY_ADOPTED_ANIMAL_SUCCESS:
            return{
              loading:false,
              adoptedMonthName:action.payload.adoptedMonthName,
              adoptedMonthValue: action.payload.adoptedMonthValue,
            }

      case MONTHLY_ADOPTED_ANIMAL_FAIL:
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




export const newCommentReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_COMMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_COMMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_COMMENT_RESET:
            return {
                ...state,
                success: false
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




export const adoptReducer = (state = {}, action) => {
    switch (action.type) {

        case ADOPT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADOPT_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case ADOPT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ADOPT_RESET:
            return {
                ...state,
                success: false
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


export const adoptAcceptReducer = (state = {}, action) => {
    switch (action.type) {

        case ADOPT_ACCEPT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADOPT_ACCEPT_SUCCESS:
            return {
                loading: false,
                isAccept: action.payload
            }

        case ADOPT_ACCEPT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ADOPT_ACCEPT_RESET:
            return {
                ...state,
                isAccept: false
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



export const adoptDeclineReducer = (state = {}, action) => {
    switch (action.type) {

        case ADOPT_DECLINE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADOPT_DECLINE_SUCCESS:
            return {
                loading: false,
                isDecline: action.payload
            }

        case ADOPT_DECLINE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ADOPT_DECLINE_RESET:
            return {
                ...state,
                isDecline: false
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