
import React from 'react'
import { Navigate, Outlet }  from 'react-router-dom'

const AuthGuard = () => {
    const isAuth = !!localStorage.getItem('token') 
  return (
    isAuth ? <Outlet/> : <Navigate to = '/login'/>
  )
}

export default AuthGuard
