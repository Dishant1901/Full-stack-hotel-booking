import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingSection from '../components/BookingSection';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';


const ViewPlacePage = () => {
    const {id} = useParams();
    const [place,setPlace] = useState(null);

 

    useEffect(() => {
        if(!id) {return};

        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    },[id]);

    if(!place) return'';

   
  return (
    <div className='mt-4 bg-gray-100 -mx-4 px-6 py-6' >

        
    <h2 className='text-3xl mr-32 ' >{place.title}</h2> 
    <AddressLink>{place.address}</AddressLink>
    <PlaceGallery place={place} />
   
   
    {/* Grid use bc */}
    <div className='mt-8 gap-4 grid grid-cols-1 md:grid-cols-[3fr_1fr]'>
        
    {/* First elemnt  */}
        <div>
             {/* DEiscropin div  */}
    <div className='my-4'>
        <h2 className=' font-semibold text-2xl' >Description</h2>
        {place.description} 
    </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuest}
        </div>
    {/* Second ELment  */}
        <div>
            <BookingSection place={place} />
        </div>

    </div>
    
    </div>
  )
}

export default ViewPlacePage