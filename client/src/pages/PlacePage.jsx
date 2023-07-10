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

        ({action==='new' && (
            <form action="">
                
            </form>
        )})
        
      

    </>
  );
};

export default PlacePage;
