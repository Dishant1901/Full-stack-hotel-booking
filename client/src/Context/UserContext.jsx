import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const UserContext=createContext({})

export const UserContextProvider = ({children}) => {
    const [user,setUser]= useState('')
    useEffect(()=>{
        if(!user){
            axios.get('/profile')
        }

    },[]);

  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}

// export default UserContext