import React, { useContext, useState } from 'react'
// import Header from '../components/Header'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const LoginPage = () => {
  // states 
  const [email,setEmail] =useState('')
  const [password,setPassword] = useState('')
  const [toHomePage,setToHomePage] = useState(false)
  const {setUser} =useContext(UserContext)
  //
  const handleSubmit =async(e)=>{
    e.preventDefault()

    try {
     const {data}= await axios.post('/login',{
        email,
        password,
      })

      alert('login successful')
      setUser(data) // if not?

      setToHomePage(true)

    } catch (error) {
      alert('login failed!')
    }
  }

  if(toHomePage){
    return <Navigate to={'/'}/>
  }

  return (
    <>
    
    <div className='mt-4 grow flex items-center justify-center '>

        <div className=' -mt-8 '>
        <h1 className='text-4xl mb-4 text-center'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder='your@eamil.com' 
              value={email}
              onChange={e=>setEmail(e.target.value)}/>
            <input 
              type="password" 
              placeholder='Password' 
              value={password}
              onChange={e=>setPassword(e.target.value)}/>

            <button className='primary'>Login</button>
            <div className='text-center mt-4'>New user? <span className=' text-primary '> <Link to={'/register'} >Register</Link> </span> here</div>
        </form>
        </div>

       
    </div>
    </>
  )
}

export default LoginPage