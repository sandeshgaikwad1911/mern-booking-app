import { createContext,useState } from "react";
import Toast from "../components/Toast";


type ToastMessageTypes = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

export type AppContextTypes = {
    showToast: (toastMessage: ToastMessageTypes) => void
};


export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextProvider = ({children} : {children: React.ReactNode}) => {

    const [toast, setToast] = useState<ToastMessageTypes | undefined>(undefined);

    return(
        <AppContext.Provider value={{showToast: (toastMessage)=> {
            // console.log("toastMessage",toastMessage);
            setToast(toastMessage);
        }}}>

            {toast && (<Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>)}

            {children}
            
        </AppContext.Provider>
    )
};



// use separate file for fast rendering

/* export const useAppContext = () => {
    const context =   useContext(AppContext);
    return context as AppContextTypes;
}; */