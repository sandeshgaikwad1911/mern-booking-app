import { RegisterFormDataType } from '../pages/Register'
const Base_url = import.meta.env.VITE_API_BASE_URL;

export const userRegisterfun = async(formData: RegisterFormDataType)=>{

    const res = await fetch(`${Base_url}/user/register`, {
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }); 
   

    const data = await res.json();

    console.log('api-client /register =>', data);

    if(!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;    // will use at OnSuccess  in register page
};

// -------------------------------------------------------------------------------------------------

export const validateTokenfun = async() => {

    const token = localStorage.getItem("auth_token");
    console.log('tok', token)
        const res = await fetch(`${Base_url}/auth/validate-token`, {
            credentials: "include",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`     
            },
           
        });

        console.log('api-clinet validateToken =>', res);
        
        if(!res.ok) {
            throw new Error("Invalid Token");
        }
        const data = await res.json();
        return data;
}
