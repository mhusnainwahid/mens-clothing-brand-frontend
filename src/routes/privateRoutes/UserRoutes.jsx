import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes = () => {
    const role = localStorage.getItem('role')
  return (
    ( role === 'user') ? <Outlet/> : <Navigate to= '/'/>
  )
}

export default UserRoutes