import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="bg-blue-800 pt-4 pb-8">
        <div className="container mx-auto flex justify-between items-center">

            <span className="text-3xl text-white font-bold">
                <Link to='/'> Holidays.com </Link>
            </span>

            <span className="flex">
                <Link to='/sign-in' className="text-blue-600 px-3 py-1 font-bold hover: bg-gray-100"> Sign in </Link>
            </span>
                 
        </div>
    </div>
  )
}

export default Header