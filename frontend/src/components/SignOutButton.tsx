import { useMutation, useQueryClient } from "react-query"
import { signOutFunc } from "../utils/api-client";
import useAppContext from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";


function SignOutButton() {

   const queryClient = useQueryClient();
   const navigate = useNavigate();

    const {showToast} = useAppContext();
    
    const {mutate} = useMutation(signOutFunc,{

        onSuccess: async() => {
            
            localStorage.removeItem("auth_token");
            await queryClient.invalidateQueries("validateToken");
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
    <button className="px-2 py-1 hover:bg-gray-100 font-semibold hover:text-blue-600  rounded bg-blue-600"
        onClick={handleClick}
    >
        Logout
    </button>
  )
}

export default SignOutButton