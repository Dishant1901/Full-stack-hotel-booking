import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/perks";
import axios from "axios";

const PlacePage = () => {
    const {action}=useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] =useState([]);
    const [photoLink ,setPhotoLink]=useState('');
    const [description,setDescription] = useState('');
    const [perks , setPerks] = useState([]);
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuest,setMaxGuest] = useState(1);
    const [extraInfo,setExtraInfo] = useState('')

    // function to add header and paragraph
    const inputHeader =(header)=>{
      return <h2 className="text-2xl mt-4">{header}</h2>
    }

    const inputDescription =(description)=>{
     return <p className="text-gray-500 text-sm" >{description}</p>
    }
    const preInput=(header, description) =>{
      return <>
      {inputHeader(header)}
      {inputDescription(description)}
      </>
    }
    
    // function to upload image by link
    const addByLink =async(e)=>{
      e.preventDefault();
      const {data:fileName}=await axios.post('/upload',{link: photoLink})
      setAddedPhotos(prev=>{
        console.log(fileName)
        return [...prev,fileName];
      })

      setPhotoLink('') 
    }
    // console.log(action)
  return (
    <>

        {action!=='new' && (
            <div className=" justify-center  text-center mt-10">
            <Link
              className=" inline-flex gap-1  bg-primary rounded-full text-white py-2 px-6"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new palces
            </Link>
          </div>
        )}

        {/* adding new places */}

        {action==='new' && (
            <div className="">
              <form >
                
                {preInput('Title','Title of your palces')}
                <input type="text" value={title} onChange={e=> setTitle(e.target.value)}  placeholder="title, for example: My apartment" />

                {preInput('Address','Addres of your palces')}
               <input type="text" value={address} onChange={e=> setAddress(e.target.value)} placeholder="address" />

                {preInput('Photos','Series of photos of this place')}

               {/* upload via link  */}
                <div className="flex gap-2 mb-4  ">
                  <input type="text" value={photoLink}  onChange={e=> setPhotoLink(e.target.value)} placeholder="Add photos using link...."  />
                  <button onClick={addByLink}  className="bg-gray-200 px-4 rounded-2xl  ">Add&nbsp;photo</button>
                </div>
                <div className="grid gap-2  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {addedPhotos.length >0 && addedPhotos.map(photo =>(
                    <div className="" >
                     <img className=" h-44 w-80 rounded-2xl" src={'http://localhost:4141/uploads/'+photo} alt="" />
                    </div>
                  ))}
                  {/* upload via button  */}
                  <label   className=" cursor-pointer border flex justify-center items-center gap-1 bg-transparent rounded-2xl p-8 text-gray-600 text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <input type="file" className="hidden" />

                    Upload
                    </label>
                </div>
                {preInput('Description','Description of your palces')}
                <textarea value={description} onChange={e=> setDescription(e.target.value)} className=" h-32" />
{/* perks  */}
                {preInput('Perks','Select all perks of the  place')}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2 ">
                  <Perks selected={perks} onchange={setPerks} />
                </div>
                {preInput('Extra Info','Rules etc')}
                
                <textarea value={extraInfo} onChange={e=> setExtraInfo(e.target.value)} className=" h-16" />
{/* check in out  */}
                {preInput('Check in & check out time','Add check in and check out time for this place')}
              
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <h3 className="mt-2 " >Check in time</h3>
                    <input type="text" value={checkIn} onChange={e=> setCheckIn(e.target.value)}  placeholder="10:00"/>
                  </div>
                  <div>
                    <h3 className="mt-2 " >Check out time</h3>
                    <input type="text"  value={checkOut} onChange={e=> setCheckOut(e.target.value)}  placeholder="22:00"/>
                  </div>
                  <div>
                    <h3 className="mt-2 " >Max no. of guest</h3>
                    <input type="number"  value={maxGuest} onChange={e=> setMaxGuest(e.target.value)}  placeholder="3"/>
                  </div>
                </div>
                <div className="w-64 mx-auto">
                  <button className="primary mt-4 " >Save</button>
                </div>
              </form>
            </div>
        )}
    </>
  );
};

export default PlacePage;
