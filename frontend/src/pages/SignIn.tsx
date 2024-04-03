import { useForm } from "react-hook-form"
import { useMutation } from "react-query";
import { signInFunc } from "../utils/api-client";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

export type SignInFormTypes = {
  email: string,
  password: string
}

export default function SignIn() {

  const navigate = useNavigate();

  const { showToast} = useAppContext();

  const {register,  handleSubmit, formState: {errors}} = useForm<SignInFormTypes>();

  const { mutate} = useMutation(signInFunc,{

    onSuccess: (data)=>{
      localStorage.setItem("auth_token", data.token);
      showToast({message: "User Sign In Successfully", type:"SUCCESS"});
      navigate("/");
    },
    onError: (error: Error) => {
      // console.log(" SignIn onError fun =>", error)
      showToast({message: error.message, type:"ERROR"});
    }

  });

  // ----------------------------------------------------------------------------

  const onsubmit = handleSubmit((data) => {
    mutate(data); // mutate calls sig nInFunc and pass data as an arguments => react query things
  })
  
  return (
    <form className="flex flex-col gap-4" onSubmit={onsubmit}>
        <h3 className="text-2xl font-semibold text-gray-700">Sign In</h3>
        <label htmlFor="" className="text-gray-600 font-bold">
            Email
            <input type="email" className="border rounded w-full py-1 px-2 font-normal"
              {...register("email",{required: "Please enter your Email"})}
              autoComplete="off"
            />
            {errors.email && (<span className="text-red-500 font-normal">{errors.email.message}</span>)}
        </label>
        <label htmlFor="" className="text-gray-600 font-bold">
            Password
            <input type="password" className="border rounded w-full py-1 px-2 font-normal"
              {...register("password",{required: "Please enter your Password",
                minLength:{value:6, message:"Your password must be at least 6 characters"}
                })
              }
              autoComplete="off"
            />
            {errors.password && (<span className="text-red-500 font-normal">{errors.password.message}</span>)}
        </label>
        <span className="font-sm text-gray-700">
          Don't have an account ? 
          <Link to="/register" className="px-2 rounded ml-1 text-blue-600 underline">Sign Up</Link>
        </span>
        <span>
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-3 rounded">Sign In</button>
        </span>
    </form>
  )
}
