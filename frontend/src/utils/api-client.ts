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


    const  data = await res.json()    
    console.log('res from server', res);

    if(!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
}