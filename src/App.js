import React, { useContext, useEffect } from "react";
import { json, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header/Header";
import DashBoard from "./components/Dashboard/DashBoard";
import Sidebar from "./components/SideBar/Sidebar";
import SidebarContext from "./components/contextApi/SideBarToggle";
import Signin from "./components/Loginandup/Signin";
import { UserContext } from "./components/contextApi/UserAuthContext";
import ProductDetail from "./components/Products/ProductDetail";
import ProductUpload from "./components/Products/ProductUpload";
import CategoryUpload from "./components/Category/CategoryUpload";
import ProductList from "./components/Products/ProductList";
import CategoryList from "./components/Category/CategoryList";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import LoadingBar from 'react-top-loading-bar'
import CategoryEdit from "./components/Category/CategoryEdit";
import ProductEdit from "./components/Products/ProductEdit";
import OrderList from "./components/Order/OrderList";

function App() {
  const { isToggleSidebr, themeMode } = useContext(SidebarContext);
  const { alertBox, setAlertBox,progress,setProgress, isLogin, setisLogin, setUser } = useContext(UserContext);
  const { isHeaderSidebar } = useContext(UserContext);

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  useEffect(()=>{
     const token = localStorage.getItem("token");
      if(token !== null && token !==""){
        setisLogin(true)
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData)
      }else{
        setisLogin(false)
      }
  },[isLogin])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertBox({
      open: false
    });
  };

  return (
    <div>
      {isHeaderSidebar !== true && <Header />}

      <div className="main d-flex">
        {isHeaderSidebar !== true && (
          <div
            className={`sidebar-wrapper ${
              isToggleSidebr === true ? "toggle" : ""
            }`}
          >
            <Sidebar />
          </div>
        )}

        <div
          className={`content ${isHeaderSidebar === true ? "Full" : ""} ${
            isToggleSidebr === true ? "toggle" : ""
          }`}
        >
          <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        className="topLoaderData"
      />
          <Snackbar
            open={alertBox.open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alertBox.error === false ? "success" : "error"}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {alertBox.msg}
            </Alert>
          </Snackbar>
          <Routes>
            <Route path="/" exact element={<DashBoard />} />
            <Route path="/signin" exact element={<Signin />} />
            <Route path="/Product-list" exact element={<ProductList />} />
            <Route path="/Product-view/:id" exact element={<ProductDetail />} />
            <Route path="/Product-upload" exact element={<ProductUpload />} />
            <Route path="/Product-Edit/:id" exact element={<ProductEdit />} />
            <Route path="/Add-Category" exact element={<CategoryUpload />} />
            <Route path="/Edited-Category/:id" exact element={<CategoryEdit />} />
            <Route path="/Category-list" exact element={<CategoryList />} />
            <Route path="/Order-list" exact element={<OrderList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
