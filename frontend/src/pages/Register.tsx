import { useForm, } from "react-hook-form";
import { useMutation } from "react-query";
import { userRegisterfun } from "../utils/api-client";
import useAppContext from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormDataType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};


const Register = () => { 

  const navigate = useNavigate();

  const { showToast} = useAppContext();

  const { register, watch, handleSubmit, formState: {errors} } = useForm<RegisterFormDataType>();

  const {mutate} = useMutation(userRegisterfun, {

    onSuccess: () => {
      // console.log("onSucess fun => register successfully");
      showToast({message: "User Registered Successfully", type:"SUCCESS"});
      navigate("/");
    },

    onError: (error: Error) => {
      console.log("onError fun =>", error)
      showToast({message: error.message, type:"ERROR"});
    }

  });

  const formSubit = handleSubmit((data)=>{
    // console.log('Onsubmitdata', data)
    mutate(data);
  });


  return (
    <form action="" className="flex flex-col gap-5" onSubmit={formSubit}>
        <h3 className="text-2xl font-bold text-gray-700">Create an Account</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <label htmlFor="" className="text-gray-600 font-bold flex-1">
            First Name
            <input type="text" className="border rounded w-full py-1 px-2 font-normal" 
              {...register("firstname",{required: "Please enter your Firstname"})}
              autoComplete="off"
            />
            {errors.firstname && (<span className="text-red-500 font-normal">{errors.firstname.message}</span>)}
          </label>
          <label htmlFor="" className="text-gray-600 font-bold flex-1">
            Last Name
            <input type="text" className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastname",{required: "Please enter your Lastname"})}
              autoComplete="off"
            />
            {errors.lastname && (<span className="text-red-500 font-normal">{errors.lastname.message}</span>)}
          </label>
        </div>
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
        <label htmlFor="" className="text-gray-600 font-bold">
            Confirm Password
            <input type="password" className="border rounded w-full py-1 px-2 font-normal"
              {...register("confirmPassword",{
                validate: (val)=>{
                  if(!val) {
                    return "Confirm your password"
                  } else if(watch("password") !=  val) {
                    return "Passwords do not match";
                  }
                    
                }
              })
              }
              autoComplete="off"
            />
            {errors.confirmPassword && (<span className="text-red-500 font-normal">{errors.confirmPassword.message}</span>)}
        </label>
        <span>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-2" type="submit">Create Account</button>
        </span>
    </form>
  )
}

export default Register