import React from 'react'
import { Navigate } from 'react-router-dom'
//navigate is a component like (Link) component but the difference is that link is a clickable (u must click on element to navigate)

export default function ProtectedRoute({ children }) {

  if (localStorage.getItem('tkn') == null) {
    return <Navigate to='/login' />
  }

  return <>

    {children}
    {/* children => nested components inside protectedRoute like products, categories  */}

  </>
}
