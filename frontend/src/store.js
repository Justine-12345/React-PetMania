import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import {animalsReducer, newAnimalReducer, animalReducer, animalDetailsReducer, animalsMonthlyRescuedReducer, animalsMonthlyAdoptedReducer, newCommentReducer, adoptReducer, adoptAcceptReducer, adoptDeclineReducer} from './reducers/animalReducers'

import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers'

import {diseasesReducer, newDiseaseReducer, diseaseReducer, diseaseDetailsReducer} from './reducers/diseaseReducers'


const reducer = combineReducers({
	animals:animalsReducer,
	newAnimal: newAnimalReducer,
	animal: animalReducer,
	animalDetails: animalDetailsReducer,
	
	diseases:diseasesReducer,
	newDisease: newDiseaseReducer,
	disease: diseaseReducer,
	diseaseDetails: diseaseDetailsReducer,

	auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,

    animalsMonthlyRescued:animalsMonthlyRescuedReducer,
    animalsMonthlyAdopted:animalsMonthlyAdoptedReducer,


    newComment: newCommentReducer,

    adopt:adoptReducer,
    adoptAccept:adoptAcceptReducer,
    adoptDecline:adoptDeclineReducer
})


let initialState = {
}

const middlware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;