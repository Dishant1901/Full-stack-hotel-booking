import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Perks from "../components/perks";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader";
import PlaceFormPage from "./PlaceFormPage";
import AccountNav from "../AccountNav";
import PlaceImg from "../components/placeImg";

const PlacePage = () => {
  const [places,setPlaces] = useState([]);
  useEffect( ()=>{
   
      axios.get('/user-places').then(({data})=>{

        setPlaces(data);
      });

  },[]);
    
   
   
  return (
    <div>

    
      <AccountNav/>

        
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

          {/* Displaying places  */}
          {places.length > 0 && places.map(place =>(
            
          <Link to={'/account/places/'+place._id}>
            <div className="flex mt-4 cursor-pointer bg-gray-100 gap-4 p-4 rounded-2xl">
              {/* for image */}
              <div className="flex bg-gray-300 w-32 h-32  ">
              {/* grow shrink-0  */}
                <PlaceImg place={place}  />
              </div>
              
              {/* Title and Description */}
              <div className="mt-2 ">
                 {/* grow-0 shrink  */}
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm">{place.description} </p>
              </div>
              
            </div>
          </Link>
          ))}
        
    </div>
  );
};

export default PlacePage;
