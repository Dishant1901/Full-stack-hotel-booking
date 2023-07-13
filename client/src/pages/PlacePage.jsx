import React from "react";
import { Link, useParams } from "react-router-dom";

const PlacePage = () => {
    const {action}=useParams()
    console.log(action)
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
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm"x >Title of your palces</p>
                <input type="text" placeholder="title, for example: My apartment" />

                <h2 className="text-2x l mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Addres of your palces</p>
                <input type="text" placeholder="address" />

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">Series of photos of this place</p>
                <div className="flex gap-2  ">
                  <input type="text" placeholder="Add photos using link...."  />
                  <button className="bg-gray-200 px-4 rounded-2xl  ">Add&nbsp;photo</button>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  <button className="border flex justify-center gap-1 bg-transparent rounded-2xl p-8 text-gray-600 text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>

                    Upload
                    </button>
                </div>
              </form>
            </div>
        )}
        
      

    </>
  );
};

export default PlacePage;
