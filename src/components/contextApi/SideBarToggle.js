import { createContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({children})=>{
    const [isToggleSidebr, setisToggleSidebr] = useState(false)
    const [themeMode, setThemeMode] = useState(true)
  return(
    <SidebarContext.Provider value={{isToggleSidebr, setisToggleSidebr,themeMode,setThemeMode}}>
        {children}
    </SidebarContext.Provider>
  )
};
export default SidebarContext;