import { createContext,useState,} from "react";
import Toast from "../components/Toast";
// import { useQuery } from "react-query";
// import { validateTokenFunc } from "../utils/api-client";


type ToastMessageTypes = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

export type AppContextTypes = {
    showToast: (toastMessage: ToastMessageTypes) => void;
    // isLoggedIn: boolean;
};

// initial value
export const AppContext = createContext<AppContextTypes | undefined>(undefined);        

// provider function / component
export const AppContextProvider = ({children} : {children: React.ReactNode}) => {      

    const [toast, setToast] = useState<ToastMessageTypes | undefined>(undefined);
    
//     const { isError,} = useQuery("validateToken", validateTokenFunc, {

//     retry: false,
    
//     onSuccess: (data)=>{
//       console.log("onSuccess", data);
//     }

//   });
    
    return(
        <AppContext.Provider value={{

            showToast: (toastMessage) => {
                setToast(toastMessage)
            },
            
            // isLoggedIn: !isError,
        }}>

            {toast && (<Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>)}

            {children}
            
        </AppContext.Provider>
    )
};


// use separate file for fast rendering 
// const useAppContext = () => {
//     const context =   useContext(AppContext);
//     return context as AppContextTypes;
// };

// export default useAppContext;