import React from 'react'
import { Navigate } from 'react-router-dom'
interface Props{
  children:any,
}
const gradRoute = ({children}:Props) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    return (
      <>
        {children}
      </>
    )
  } else {
    return <Navigate to='/Login'/>
  }
 
}

export default gradRoute