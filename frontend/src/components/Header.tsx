import { Link } from "react-router-dom"
import useAppContext from "../hooks/useAppContext"

function Header() {
  const {isLoggedIn} = useAppContext();
  return (
    <div className="bg-blue-800 pt-4 pb-8">

        <div className="container mx-auto flex justify-between items-center">

            <span className="text-3xl text-white font-bold">
                <Link to='/'> Holidays.com </Link>
            </span>
            
            <span className="flex space-x-2 text-lg text-white">
              {
                isLoggedIn ?
                <>
                  <Link to="/my-bookings">My Bookings</Link>
                  <Link to="/my-hotels">My Hotels</Link>
                  <button>Sign out</button>
                </>  : 
                (
                  <Link to='/sign-in' className="text-blue-600 px-3 py-1 font-bold hover: bg-gray-100"> Sign in </Link>
                )
              }
            </span>
                           
        </div>
        
    </div>
  )
}

export default Header