import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { Navigate,Link, useParams } from 'react-router-dom'


const AccountPage = () => {
  const {user,ready} = useContext(UserContext)

  if(!ready) {
    return 'Loading......'
  }

  // ready but no info about user then redirecting to login page
  if(ready && !user)
  {
    return <Navigate to={'/login'}/>
  }

  const {subpage} = useParams()
  console.log(subpage)

  return (
    <div>
      <nav className='flex w-full mt-8 gap-2 justify-center'>
        <Link className='p-2  px-6   bg-primary text-white  rounded-full' to ={'/account'}> My Account</Link>
        <Link className='p-2 px-6 ' to ={'/account/bookings'}> My Bookings</Link>
        <Link className='p-2 px-6 ' to ={'/account/places'}> My Places</Link>
      </nav>
    </div>
  )
}

export default AccountPage