import { Link } from "react-router-dom"
// import useAppContext from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import SignOutButton from "./SignOutButton";

function Header() {
  
      const [authToken, setAuthToken] = useState<null | string>(null);
      
      useEffect(()=>{
        const  token = localStorage.getItem("auth_token");
        if (token) {setAuthToken(token)}
        
      },[authToken]);
  
 
  return (
    <div className="bg-blue-800 pt-4 pb-8">

        <div className="container mx-auto flex justify-between items-center">

            <span className="text-3xl text-white font-bold">
                <Link to='/'> Holidays.com </Link>
            </span>

            {
              authToken ? (
                  <span className="flex gap-2 items-center text-lg text-white"> 
                        <Link to="/my-bookings" className="hover:bg-blue-600 px-2 py-1 rounded">My Bookings</Link>
                        <Link to="/my-hotels" className="hover:bg-blue-600 px-2 py-1 rounded">My Hotels</Link>
                        <SignOutButton  />
                  </span>
              ) : (
                <span>
                  <Link to='/sign-in' className="text-blue-600 px-3 py-1 font-bold hover: bg-gray-100"> Sign in </Link>
                </span> 
              )
            }        
        
        </div>
        
    </div>
  )
}

export default Header