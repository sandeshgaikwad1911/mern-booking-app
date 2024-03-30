import { RegisterFormDataType } from '../pages/Register'
import { SignInFormTypes } from '../pages/SignIn';
const Base_url = import.meta.env.VITE_API_BASE_URL;


export const userRegisterFunc = async(formData: RegisterFormDataType)=>{

    const res = await fetch(`${Base_url}/user/register`, {
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }); 
   

    const data = await res.json();

    // console.log('api-client => userRegisterFunc =>', data);

    if(!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;    // will use at OnSuccess => react-query things
};

// -------------------------------------------------------------------------------------------------

export const validateTokenFunc = async() => {

    const token = localStorage.getItem("auth_token");

        if (!token){
            return false;   // not logged in
        }

        const res = await fetch(`${Base_url}/auth/validate-token`, {
            credentials: "include",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`     
            },
           
        });

        // console.log('api-clinet validateToken =>', res);

        const data = await res.json();
        
        if(!res.ok) {
            throw new Error(data.message || "Server error!");
        }
        return data;         // will use at OnSuccess => react-query things
}

//  ------------------------------------------------------------------------------------------------

export const  signInFunc = async(formData: SignInFormTypes) => {
    const res = await fetch(`${Base_url}/auth/login`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
    });

    // console.log("api-client => signInFunc => res", res)

    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message || "Something went wrong!");
    }

    return data;         // will use at OnSuccess => react-query things
}

//  --------------------------------------------------------------------------------------------

export const signOutFunc = async() => {
    const res = await fetch(`${Base_url}/auth/logout`,{
        method:"POST",
        credentials: 'include'
    })

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data?.message || "Error during sign out.");
    }
    // return data;


}