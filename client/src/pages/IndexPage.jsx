import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'

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
  
    <div className=' pt-20  grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3  lg:grid-cols-4'>
      {places.length >0 && places.map(place =>(
        <div className='' >
          {/* image div */}
          <div className=' mt-4 h-[290px] w-[260px] bg-gray-100' >
          {place.photos?.[0] && (
            <img className='  object-cover rounded-2xl h-full w-full' src={'http://localhost:4141/uploads/'+place.photos?.[0]} alt="" />
            )}
            </div >
            <h2 className='text-sm '>{place.title}</h2>
            <h3 className=' font-bold  '>{place.address} </h3>
            <div>${place.price} per night</div>
          
        </div>
      ))}
    </div>

   
   </>
  )
}

export default IndexPage