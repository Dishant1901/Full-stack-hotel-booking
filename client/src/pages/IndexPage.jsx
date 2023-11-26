import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
import axios from 'axios'
import { Link } from 'react-router-dom'

const IndexPage = () => {
  const [places,setPlaces]= useState([]) // rember its a array

  useEffect(()=>{
    axios.get('/places').then(response=>{
      setPlaces([...response.data,...response.data,...response.data,...response.data])
    })
  },[])
  console.log(places)


  return (
   <>
  
    <div className=' pt-20  grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3  lg:grid-cols-4'>
      {places.length >0 && places.map(place =>(
        // link to view single page based on id 
        <Link to={'/place/'+place._id} className='' >
          {/* image div */}
          <div className=' mt-4 h-[290px] w-[260px] bg-gray-100' >
          {place.photos?.[0] && (
            <img className='  object-cover rounded-2xl h-full w-full' src={'http://localhost:4141/uploads/'+place.photos?.[0]} alt="" />
            )}
            </div >
            <h3 className=' font-bold  '>{place.address} </h3>
            <h2 className='text-sm text-gray-500 '>{place.title}</h2>
            <span className='font-bold'>₹{place.price}</span> per night
          
        </Link>
      ))}
    </div>

   
   </>
  )
}

export default IndexPage