import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AdminProtected = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    if(!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to='/' replace/>
    }
  return (
    <Outlet/>
  )
}

export default AdminProtected