import React, {  useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  FaAngleRight,
  FaBell,
  FaCartArrowDown,
  FaProductHunt,
} from "react-icons/fa";
import { MdDashboard, MdMessage } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contextApi/UserAuthContext";


function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setisToggleSubmenu] = useState(false);
  const {setisLogin} = useContext(UserContext)
  const navigate = useNavigate()

  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token !== null && token !==""){
      setisLogin(true)
    }else{
      navigate('/signin')
    }
  },[])

  const isOpenSubMenu = (index) => {
    setActiveTab(index);
    setisToggleSubmenu(!isToggleSubmenu);
  };

  return (
    <div>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                onClick={() => isOpenSubMenu(0)}
              >
                <span className="icon">
                  {" "}
                  <MdDashboard />{" "}
                </span>
                DashBoard
                {/* <span className="arrow">
                  <FaAngleRight />
                </span> */}
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 1 && isToggleSubmenu ===true ? "active" : ""}`}
              onClick={() => isOpenSubMenu(1)}
            >
              <span className="icon">
                {" "}
                <FaProductHunt />{" "}
              </span>
              Product
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 1 && isToggleSubmenu ===true
                  ? "collapsed"
                  : "collapse"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/Product-list">Product List</Link>
                </li>
                {/* <li>
                  <Link to="/Product-view">Product View</Link>
                </li> */}
                <li>
                  <Link to="/Product-upload">Product Upload</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 2 && isToggleSubmenu ===true ? "active" : ""}`}
              onClick={() => isOpenSubMenu(2)}
            >
              <span className="icon">
                {" "}
                <FaProductHunt />{" "}
              </span>
              Category
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 2 && isToggleSubmenu ===true
                  ? "collapsed"
                  : "collapse"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/Category-list">Category List</Link>
                </li>
                <li>
                  <Link to="/Add-Category">Add Category</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/Order-List">
              <Button
                className={`w-100 ${activeTab === 3 ? "active" : ""}`}
                onClick={() => isOpenSubMenu(3)}
              >
                <span className="icon">
                  {" "}
                  <FaCartArrowDown />{" "}
                </span>
                Orders
                {/* <span className="arrow">
                  <FaAngleRight />
                </span> */}
              </Button>
            </Link>
          </li>
          <li>
              <Button
                className={`w-100 ${activeTab === 4 ? "active" : ""}`}
                onClick={() => isOpenSubMenu(4)}
              >
                <span className="icon">
                  {" "}
                  <MdMessage />{" "}
                </span>
                Message
                {/* <span className="arrow">
                  <FaAngleRight />
                </span> */}
              </Button>
           
          </li>
          <li>
              <Button
                className={`w-100 ${activeTab === 5 ? "active" : ""}`}
                onClick={() => isOpenSubMenu(5)}
              >
                <span className="icon">
                  {" "}
                  <FaBell />{" "}
                </span>
                Notification
                {/* <span className="arrow">
                  <FaAngleRight />
                </span> */}
              </Button>
           
          </li>
          <li>
            
              <Button
                className={`w-100 ${activeTab === 6 ? "active" : ""}`}
                onClick={() => isOpenSubMenu(6)}
              >
                <span className="icon">
                  {" "}
                  <IoIosSettings />{" "}
                </span>
                Setting
                {/* <span className="arrow">
                  <FaAngleRight />
                </span> */}
              </Button>
            
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
