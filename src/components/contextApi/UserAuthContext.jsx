import React,{createContext,useState} from "react";


export const UserContext = createContext();

export const UserProvide = ({children}) =>{
    const [isHeaderSidebar,setisHeaderSidebar]= useState(false);
    const [isLogin, setisLogin] = useState(false);
    const [progress, setProgress] = useState(0);
    const [alertBox, setAlertBox] = useState({
        open:false,
        msg:"",
        error:false
    });
    const [user,setUser] = useState({
        name:"",
        email:""
    })
    const BaseURl = "https://full-stack-ecommerce-server.vercel.app"

    return(
        <UserContext.Provider value={{
            isHeaderSidebar,
            setisHeaderSidebar,
            isLogin,
            setisLogin,
            alertBox,
            setAlertBox,
            progress,
            setProgress,
            BaseURl,
            user,
            setUser
         }}>
            {children}
        
        </UserContext.Provider>


    )
}