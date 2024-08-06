import { Button } from "@mui/material";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { options } from "../../utility/utility";
import { IoIosTimer } from "react-icons/io";

function DashboardBox(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;
  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
      }}
    >
      <span className="chart">{props.grow}</span>
      <div className="d-flex w-100">
        <div className="col1">
          <h4 className="text-white mb-0">{props.title}</h4>
          <span className="text-white">277</span>
        </div>
        <div className="ml-auto">
          <span className="icon">{props.icon}</span>
        </div>
      </div>
      <div className="d-flex align-items-center bottom-ele">
        <h6 className="text-white mb-0 mt-0">Last month</h6>
        <div className="ml-auto">
          <Button className="ml-auto togglrIcon" onClick={handleClick}>
            <HiDotsVertical />
          </Button>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "14ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
              <span className="timerIcon">
              <IoIosTimer/> 
                </span>{option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default DashboardBox;
