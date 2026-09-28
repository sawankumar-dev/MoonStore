import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PublicRoutes = () => {
     const { isAuthenticated } = useSelector((state) => state.auth)
    if(isAuthenticated) {
        return <Navigate to='/' replace/>
    }
  return (
    <Outlet/>
  )
  
}

export default PublicRoutes