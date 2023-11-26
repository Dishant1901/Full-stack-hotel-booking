import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from "date-fns";
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const BookingSection = ({place}) => {
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} =useContext(UserContext);

    useEffect(()=>{
        if(user) {
            setName(user.name);
        }
    },[user])
    //
    let numberOfNights = 0;
    if (checkIn && checkOut) {
      numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    const bookFunc= async()=> {
        const response = await axios.post('/bookings', {
          checkIn,checkOut,numberOfGuests,name,phone,
          place:place._id,
          price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      }
    
      if (redirect) {
        return <Navigate to={redirect} />
      }
    //
  return (
    <div>
        <div className='bg-white shadow rounded-2xl p-4'>
                <div className='tetx-2xl text-center' >
                    Price: Rs- {place.price}/ per night
                </div>
                <div className='flex'>
                <div className='my-4 border py-4 px-4 rounded-2xl'>
                    <label >Check in: </label>
                    <input type="date"
                           value={checkIn}
                           onChange={ev => setCheckIn(ev.target.value)} />
                </div>
                <div className='my-4 border p-4 rounded-2xl'>
                    <label >Check out: </label>
                    <input type="date"
                        value={checkOut}
                        onChange={ev => setCheckOut(ev.target.value)} />
                </div>
                </div>

            {/*  */}
            <div className='my-4 border p-4 rounded-2xl'>
                    <label >No. of Guest </label>
                    <input type="number" value={numberOfGuests}
                        onChange={ev=> setNumberOfGuests(ev.target.value)} />
                </div>
                
            {numberOfNights>0 && (
            <div className='my-4 border p-4 rounded-2xl'>
                 <label >Your Full Nmae:  </label>
                 <input type="text"
                 placeholder='Ex- Dishant Singh'
                        value={name}
                        onChange={ev=> setName(ev.target.value)} />
                <label >Your Phone NUmber:  </label>
                <input className='border rounded-2xl w-full p-2'
                        type=" tel"
                        placeholder='917477xxxx'
                        value={phone}
                        onChange={ev=> setPhone(ev.target.value)} />
             </div>
            )}
               
                <button onClick={bookFunc} className=' primary' >Book This place
                        {numberOfNights > 0 && (
                <span> RS-{numberOfNights * place.price}</span>
                )}
                </button>
            </div>
    </div>
  )
}

export default BookingSection