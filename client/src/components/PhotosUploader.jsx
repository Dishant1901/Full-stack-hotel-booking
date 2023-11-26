import axios from "axios";
import React, { useState } from "react";

function PhotosUploader({addedPhotos,onChange}) {
    const [photoLink ,setPhotoLink]=useState('');

     // function to upload image by link
     const addByLink =async(e)=>{
        e.preventDefault();
        const {data:fileName}=await axios.post('/upload',{link: photoLink})
        onChange(prev=>{
          console.log(fileName)
          return [...prev,fileName];
        })
  
        setPhotoLink('') 
      }
      
      // upload by buttopn using multer
      const uploadPhoto =(e)=>{
        // e.preventDefault();
        const files = e.target.files;
        const data = new FormData();
        for(let i =0;i<files.length;i++){
  
          data.append('photos',files[i])
        }
  
        axios.post('/uploadPhoto',data,{
          headers:{'Content-Type': 'multipart/form-data'}
        }).then(response =>{
            const {data:fileNames}= response;
            onChange(prev=>{
              return [...prev, ...fileNames];
            })
          })
      }

      // To remove  photos
      const removePhoto=(e,fileName)=>{
        e.preventDefault();
        onChange([...addedPhotos.filter(photo=>photo !==fileName)]); // take another dive into how this is working
      }

      // To select photo as Main
      const selectMain=(e,fileName)=>{
        e.preventDefault();
        onChange([fileName, ...addedPhotos.filter(photo=>photo !==fileName)]);
      }
  

  return (
    <>
         {/* upload via link  */}
         <div className="flex gap-2 mb-4  ">
                  <input type="text" value={photoLink}  onChange={e=> setPhotoLink(e.target.value)} placeholder="Add photos using link...."  />
                  <button onClick={addByLink}  className="bg-gray-200 px-4 rounded-2xl  ">Add&nbsp;photo</button>
                </div>
                {/* this displays images */}
                <div className="grid gap-2  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {addedPhotos.length >0 && addedPhotos.map(photo =>(
                    <div className=" flex relative" key={photo} >
                      {/* Classes to display delete and FAV icon on each images */}
                     <img className=" h-44 w-80 rounded-2xl object-cover " src={'http://localhost:4141/uploads/'+photo} alt="" />
                     {/* delete button */}
                     <button onClick={ev => removePhoto(ev,photo)}  className=" absolute bottom-1 right-1 text-white bg-black p-1 bg-opacity-50 py-2 rounded-xl">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                     </button>
                     {/* selsect main buttopn */}
                     <button onClick={ev => selectMain(ev,photo)}  className=" absolute bottom-1 left-1 text-white bg-black p-1 bg-opacity-50 py-2 rounded-xl">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>

                     </button>
                    </div>
                  ))}
                  {/* upload via button  */}
                  <label   className=" cursor-pointer border flex justify-center items-center gap-1 bg-transparent rounded-2xl p-8 text-gray-600 text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <input type="file" multiple onChange={uploadPhoto} className="hidden"  />

                    Upload
                    </label>
                    
                </div>
              
    </>
  )
}

export default PhotosUploader