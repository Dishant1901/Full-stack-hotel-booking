import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [login,setLogin]=useState(false)

 const registerUser =async (e)=>{
    e.preventDefault();

    try {
      await axios.post('/register',{
        name,
        email,
        password,
      })
  
      alert(`User registrated successfully`)
      setLogin(true);
      
    } catch (error) {
      alert("Registration failed!") 
    }

   

  }
  
  if(login){
    return <Navigate to={'/login'} />
  }
  return (
        <div className='mt-4 grow flex items-center justify-center '>

<div className=' -mt-8 '>
<h1 className='text-4xl mb-4 text-center'>Register</h1>
<form className='max-w-md mx-auto' onSubmit={registerUser}>
    <input 
      type="text" 
      placeholder='Name'
      value={name} 
      onChange={e=>setName(e.target.value)}
     />
    <input 
      type="email" 
      placeholder='your@eamil.com'
      value={email}
      onChange={e=>setEmail(e.target.value)}  />

    <input 
      type="password" 
      placeholder='Password' 
      value={password}
      onChange={e=>setPassword(e.target.value)}/>

    <button  className='primary'>Register</button>
    <div className='text-center mt-4'>Already a user? <span className=' text-primary '> <Link to={'/login'} >Login</Link> </span> here</div>
</form>
</div>



</div>
    
  )
}

export default RegisterPage