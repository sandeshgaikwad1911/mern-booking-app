import { useMutation } from "react-query"
import { signOutFunc } from "../utils/api-client";
import useAppContext from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";


function SignOutButton() {

    const {showToast} = useAppContext();
    const navigate = useNavigate();

    const {mutate} = useMutation(signOutFunc,{

        onSuccess: () => {
            localStorage.removeItem("auth_token")
            showToast({message: "User Sign Out Successfully", type: "SUCCESS"});
            navigate('/')
        },

        onError: (error: Error)=>{
            showToast({message: error.message, type: "ERROR"})
        }
    })

    const  handleClick= ()=>{
        mutate();
    }

  return (
    <button className="text-blue-600 px-2 py-1 font-semibold bg-white hover:bg-gray-100  rounded"
        onClick={handleClick}
    >
        Sign Out
    </button>
  )
}

export default SignOutButton