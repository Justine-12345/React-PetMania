import React, { Fragment } from 'react'
import { Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin=false, isAdoptor=false, children }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    // console.log(children.type.name, isAuthenticated, loading, user)
    
    
    
    let navigate = useNavigate();
    
    if ((isAuthenticated === undefined || isAuthenticated === false)) {
                   return <Navigate to='/login'  />;
        }



    if (isAdmin === true && user.role !== 'personnel') {
            return <Navigate to='/' />;
        }

      return children;
};
export default ProtectedRoute