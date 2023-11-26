import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate,  useParams } from "react-router-dom";
import axios from "axios";
// import PlacePage from "./PlacePage";
import AccountNav from "../AccountNav";

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [toHome, setToHome] = useState(null);
  let { subpage } = useParams();
  // console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }
  // logout function
  const handleLogout = async () => {
    await axios.post("/logout");
    // return <Navigate to={'/'}/>
    setToHome("/");
    setUser(null);
  };

  if (!ready) {
    return "Loading......";
  }

  // ready but no info about user then redirecting to login page
  if (ready && !user && !toHome) {
    // if not redirecting tohomapge
    return <Navigate to={"/login"} />;
  }
  if (toHome) {
    return <Navigate to={toHome} />;
  }

 
  return (
    <div>
      <AccountNav/>
      {/*  */}
      {subpage === "profile" && (
        <div className="text-center flex flex-col  items-center mt-8">
          Logged in as {user.name} ({user.email})
          <button onClick={handleLogout} className="primary max-w-sm mt-3">
            Log Out
          </button>
        </div>
      )}

      {/* {subpage === "places" && (
        <div>
          <PlacePage />
        </div>
      )} */}
    </div>
  );
};

export default AccountPage;
