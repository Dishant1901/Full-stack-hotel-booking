import {React,useEffect,useState} from 'react'
import PhotosUploader from '../components/PhotosUploader';
import Perks from '../components/perks';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const PlaceFormPage = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] =useState([]);
    const [goTo,setGoTo] = useState(false);
    const [description,setDescription] = useState('');
    const [perks , setPerks] = useState([]);
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuest,setMaxGuest] = useState('');
    const [extraInfo,setExtraInfo] = useState('')
    const [price,setPrice] = useState('1000')

    useEffect(()=>{
      if(!id) return;

      axios.get('/places/'+id).then(response=>{
        const {data} =response
        setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuest(data.maxGuest);
       setPrice(data.price);
      })

    },[id]);



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
  
      // function to save formdata
      const addNewPlace= async(e) =>{
        e.preventDefault();
        
        const placeData={
          title,address,addedPhotos,price,
          description,perks, checkIn,
          checkOut,maxGuest,extraInfo
        }

        if(id){
          // Updating 
          await axios.put('/places',{
            id,...placeData
           
          }); 
          setGoTo(true);
        } else {
          // Adding New Place
          await axios.post('/places',placeData); 
          setGoTo(true);
        }
        
        
      }
  
    //   if(setGoTo && action!='new' ) return <Navigate to={'/account/places'} />

    if(goTo) return <Navigate to={'/account/places'}/>      
     
  return (
    <>
      {/*  */}
      <AccountNav/>
     <div className="">
              <form onSubmit={addNewPlace} >
                
                {preInput('Title','Title of your palces')}
                <input type="text" value={title} onChange={e=> setTitle(e.target.value)}  placeholder="title, for example: My apartment" />

                {preInput('Address','Addres of your palces')}
               <input type="text" value={address} onChange={e=> setAddress(e.target.value)} placeholder="address" />

                {preInput('Photos','Series of photos of this place')}
{/* Photo uploader component  */}
              <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description','Description of your palces')}
                <textarea value={description} onChange={e=> setDescription(e.target.value)} className=" h-32" />
          {/* perks  */}
                {preInput('Perks','Select all perks of the  place')}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2 ">
                  <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info','Rules etc')}
                
                <textarea value={extraInfo} onChange={e=> setExtraInfo(e.target.value)} className=" h-16" />
          {/* check in out  */}
                {preInput('Check in & check out time','Add check in and check out time for this place')}
              
                <div className="grid grid-cols-4 gap-2">
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
                  <div>
                    <h3 className="mt-2 " >Price</h3>
                    <input type="number"  value={price} onChange={e=> setPrice(e.target.value)}  placeholder="1000"/>
                  </div>
                </div>
                <div className="w-64 mx-auto">
                  <button className="primary mt-4 " >Save</button>
                </div>
              </form>
            </div>
    </>
  )
}

export default PlaceFormPage