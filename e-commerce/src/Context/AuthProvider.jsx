import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const value = localStorage.getItem('tkn')
    if (value != null) { //if not equal null =>
      //every refresh i will assign the token in localStorage to token state 
      //so when i refresh the token state if it has a value(valid token),it will not be null because of rerendering  
      setToken(value)
    }
  }, [])
  //each refresh => check localStorage => tkn?  
  return (
    <AuthContext.Provider value={{ myToken: token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
