import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

function RequireAuth() {

  const {token} = useSelector(state=>state.auth);

  if(!token){
    return <Navigate to="/login" />
  }

  return (
    <Outlet />
  )
}

export default RequireAuth;