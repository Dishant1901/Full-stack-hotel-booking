import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { Navigate,Link, useParams } from 'react-router-dom'
import axios from 'axios'


const AccountPage = () => {
  const {user,ready,setUser} = useContext(UserContext)
  const [toHome,setToHome] =useState(null)
  let {subpage} = useParams();
  console.log(subpage)
  if(subpage===undefined){
    subpage='profile';
  }
  // logout function
   const handleLogout=async()=> {
    await axios.post('/logout')
    // return <Navigate to={'/'}/>
    setToHome('/')
    setUser(null)
  }

  if(!ready) {
    return 'Loading......'
  }

  // ready but no info about user then redirecting to login page
  if(ready && !user && !toHome) // if not redirecting tohomapge 
  {
    return <Navigate to={'/login'}/>
  }

  

  const linkClasses =(type=null)=>{
    let classes= 'p-2 px-6';
    if(type===subpage)
    {
      classes+= ' bg-primary text-white  rounded-full';
    }
    return classes;

  }

  if(toHome){
    return <Navigate to={toHome} />
  }

  return (
    <div>
      <nav className='flex w-full mt-8 gap-2 justify-center'>
        <Link className= {linkClasses('profile')} to ={'/account'}> My Account</Link>
        <Link className={linkClasses('bookings')} to ={'/account/bookings'}> My Bookings</Link>
        <Link className={linkClasses('places')} to ={'/account/places'}> My Places</Link>
      </nav>
      {/*  */}
      {subpage=== 'profile' &&(
        <div className='text-center flex flex-col  items-center mt-8'>
          Logged in as {user.name} ({user.email})
          <button onClick={handleLogout} className='primary max-w-sm mt-3'>Log Out</button>

        </div>
      )}
    </div>
  )
}

export default AccountPage