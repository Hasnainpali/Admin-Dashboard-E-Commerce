import { Button, Divider, Menu,  } from '@mui/material';
import React from 'react'


function DropdownMenu(props) {
    const {title,label,OpenNotification,Open} = props
  return (
    <Menu
    isOpenNotification={OpenNotification}
    className="dropdown_list"
    id="Notication-menu"
    open={Open}
    onClose={props.onClose}
    onClick={props.onClick}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1,
        "& .MuiAvatar-root": {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        "&::before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: "background.paper",
          transform: "translateY(-50%) rotate(45deg)",
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  >
    <div className="head pl-3 ">
      <h4> {title} </h4>
    </div>
    <Divider />
    <div className="btnn">
      <Button className="btn-blue w-100 ">
         {label}
      </Button>
    </div>
  </Menu>
  )
}

export default DropdownMenu
