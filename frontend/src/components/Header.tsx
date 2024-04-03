import { Link } from "react-router-dom"

import SignOutButton from "./SignOutButton";
import useAppContext from "../hooks/useAppContext";

function Header() {
  
  const {isLoggedIn} = useAppContext();
 
  return (
    <div className="bg-blue-800 pt-4 pb-8">

        <div className="container mx-auto flex justify-between items-center">

            <span className="text-3xl text-white font-bold">
                <Link to='/'> Holidays.com </Link>
            </span>

            {
              isLoggedIn ? (
                  <span className="flex gap-2 items-center text-lg text-white"> 
                        <Link to="/my-bookings" className="hover:bg-blue-600 px-2 py-1 rounded">My Bookings</Link>
                        <Link to="/my-hotels" className="hover:bg-blue-600 px-2 py-1 rounded">My Hotels</Link>
                        <SignOutButton  />
                  </span>
              ) : (
                <span>
                  <Link to='/sign-in' className="text-white bg-blue-600 px-3 py-1 font-semibold hover:bg-gray-100 hover:text-blue-600 rounded"> Sign in </Link>
                </span> 
              )
            }        
        
        </div>
        
    </div>
  )
}

export default Header