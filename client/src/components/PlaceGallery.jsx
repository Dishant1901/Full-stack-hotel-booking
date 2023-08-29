import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
    const [showAllPic,setShowAllPic] = useState(false);

     // TO show gallery ofimages 
     if(showAllPic){
        return(
// IMP  //
        <div className='  absolute inset-0  bg-black text-white  min-h-full'>
            <div className=' bg-black grid p-8 gap-4'>
            <div>
                <h2 className='  text-3xl'>Photos of {place.title}</h2>
                <button onClick={()=>setShowAllPic(false)} className='flex right-12 top-8 gap-1 px-4 py-2 rounded-2xl bg-gray text-black fixed shadow shadow-black'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
Close Photos</button>
            </div>
           <div className='flex flex-col gap-2 justify-center'>
           {place?.photos?.length >0 && place.photos.map(photo=>(
                <img src={`http://localhost:4141/uploads/`+photo} alt="" />
            ))}
           </div>
            
            </div>

            </div>
           
        
             )
    }
    
  return (
    <div>
         <div className="relative ">
        <div className='grid  gap-2 grid-cols-[2fr_1fr]  mt-4 rounded-3xl overflow-hidden'>
            {/* images at left side */}
            <div className=' ' >
                {place.photos?.[0] && (
                    <div className=''>

                    <img  onClick={()=>setShowAllPic(true)}  className='  aspect-square object-cover ' src={`http://localhost:4141/uploads/${place.photos[0]}`} alt="" />
                    </div>
                )}
            </div>
            {/* 2 images at right side */}
            <div className='grid  '>
                {/*IMP idr ye overdflow wala and postion: Relative dekna firse */}
            {place.photos?.[1] && (
                    <img onClick={()=>setShowAllPic(true)} className='aspect-square object-cover' src={`http://localhost:4141/uploads/${place.photos[1]}`} alt="" />
                )}

                <div className=' overflow-hidden '>
                {place.photos?.[2] && (
                    <img onClick={()=>setShowAllPic(true)} className='aspect-square object-cover relative top-2' src={`http://localhost:4141/uploads/${place.photos[2]}`} alt="" />
                )}
                </div>
            </div>
        </div>

        {/* Button */}
        <button onClick={()=>setShowAllPic(true)} className=' flex gap-1 absolute bottom-2 right-2 bg-white p-2 rounded-2xl shadow shadow-gray-400' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

            More Photos</button>
    </div>

    </div>
  )
}

export default PlaceGallery