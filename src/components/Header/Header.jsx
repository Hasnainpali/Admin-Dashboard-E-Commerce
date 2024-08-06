import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import {
  MdMenuOpen,
  MdOutlineLightMode,
  MdOutlineMailOutline,
  MdOutlineMenu,
} from "react-icons/md";
import Search from "../component.common/Search";
import { IoCartOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { IoShieldHalfSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Divider } from "@mui/material";
import { Notification_data } from "../../utility/utility";
import SidebarContext from "../contextApi/SideBarToggle";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contextApi/UserAuthContext";


export default function Header() {
  const [isOpenAcc, setisOpenAcc] = useState(false);
  const [isOpenNotification, setisOpenNotification] = useState(false);
  const openAcc = Boolean(isOpenAcc);
  const openNotification = Boolean(isOpenNotification);
  const {isToggleSidebr, setisToggleSidebr, themeMode, setThemeMode} = useContext(SidebarContext);
  const {isLogin, user, setAlertBox} = useContext(UserContext);
  const navigate = useNavigate();


  const OpenAccdrop = () => {
    setisOpenAcc(true);
  };
  const closeMyAccdrop = () => {
    setisOpenAcc(false);
  };

  const OpenNotification = () => {
    setisOpenNotification(true);
  };
  const closeNotication = () => {
    setisOpenNotification(false);
  };
  
  const logout = ()=>{
     localStorage.clear()
     setisOpenAcc(null)
     setTimeout(() => {
      setAlertBox({
        open:true,
        error:false,
        msg:"Logout Successfully"
       })
      navigate('/signin')
     }, 3000);
  }
  
  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center">
            <div className="col-sm-2 ">
              <a href="/" className="text-decoration-none">
                <span className="h4 text-uppercase text-dark logotext  px-2">Multi</span>
                <span className="h4 text-uppercase text-warning  px-2 ml-n1">
                  Shop
                </span>
              </a>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <Button className="rounded-circle mr-3" onClick={()=>setisToggleSidebr(!isToggleSidebr)}>
                {
                  isToggleSidebr === false ? <MdMenuOpen /> : <MdOutlineMenu/>
                }
              </Button>
              <Search />
            </div>
            <div className="col-sm-7 d-flex align-items-center justify-content-end">
              <Button className="rounded-circle mr-3" onClick={()=>setThemeMode(!themeMode)}>
                <MdOutlineLightMode />
              </Button>
              <Button className="rounded-circle mr-3">
                <IoCartOutline />{" "}
              </Button>
              <Button className="rounded-circle mr-3">
                <MdOutlineMailOutline />{" "}
              </Button>
              <div className="notication position-relative">
              <Button className="rounded-circle mr-3" onClick={OpenNotification}>
                <FaRegBell />{" "}
              </Button>
              <Menu
                isOpenNotification={isOpenNotification}
                className="dropdown_list"
                id="Notication-menu"
                open={openNotification}
                onClose={closeNotication}
                onClick={closeNotication}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <div className="head pl-3 ">
                    <h4>Notication </h4>
                </div>
                <Divider/>
                <div className="scroll">
                {
                  Notification_data.map((items, index)=>{
                    return(
                      <>
                     <MenuItem onClick={closeNotication} key={index}>
                   <div className="d-flex align-items-center justify-content-center">
                      <div>
                         <div className="user-img">
                    <span className="rounded-circle">
                      <img
                        src={items.images}
                        alt=""
                      />
                    </span>
                         </div>
                      </div>
                      <div className="Dropdowninfo">
                         <h4>
                            {items.description}
                         </h4>
                         <p className="text-sky mb-0">
                            few second ago
                         </p>
                      </div>
                      <div className="icon">
                         <BsThreeDotsVertical/>
                      </div>
                   </div>
                </MenuItem>
                    </>
                    )
                  })
                }
                </div>
                <div className="btnn">
                    <Button className="btn-blue w-100 ">
                          view All Notification
                    </Button>
                </div>
              </Menu>
              </div>
              {
                isLogin !== true ? <Link to='/signin'><Button className="btn-blue">Sign in</Button></Link> :
                 <>
                   <Button className="myAccWrapper mx-2" onClick={OpenAccdrop}>
                <div className="MyAcc d-flex align-items-center">
                  <div className="user-img">
                    <span className="rounded-circle">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="user-info ">
                    <h4> {user.name}</h4>
                    <p className="mb-0">{user.email}</p>
                  </div>
                </div>
              </Button>
              <Menu
                isOpenAcc={isOpenAcc}
                id="account-menu"
                open={openAcc}
                onClose={closeMyAccdrop}
                onClick={closeMyAccdrop}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
          
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={closeMyAccdrop}>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  My Account
                </MenuItem>
                <MenuItem onClick={closeMyAccdrop}>
                  <ListItemIcon>
                    <IoShieldHalfSharp />
                  </ListItemIcon>
                  Reset Password
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
                 </>
              }
             
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
