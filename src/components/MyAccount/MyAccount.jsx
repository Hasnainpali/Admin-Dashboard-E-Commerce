import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import { IoMdCloudUpload } from "react-icons/io";
import { Button, TextField } from "@mui/material";
import { editdata, fetchDataFormApi } from "../../utility/Api";
import { useNavigate} from "react-router-dom";
import { UserContext } from "../contextApi/UserAuthContext";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MyAccount() {
  const [value, setValue] = useState(0);
  const { setAlertBox, setisLogin, setUser } = useContext(UserContext);
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    phone: "",

  });
  // const [field, setField] = useState({
  //   oldPassword: "",
  //   password: "",
  //   confirmPassword: "",
   
  // });
  const formdata = new FormData();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    setFormField(() => ({
      ...formField,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleInputChange2 = (e) => {
  //   setField(() => ({
  //     ...field,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== "") {
      setisLogin(true);
    } else {
      navigate("/signin");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFormApi(`/api/user/${user?.userId}`, formField).then((res) => {
      setUser(res);
      setFormField({
        name: res.name,
        email: res.email,
        phone: res.phone,
      });
    });
  }, [setisLogin,navigate,setFormField,formField,setUser]);

  const editProfile = async (e) => {
    e.preventDefault(); // Prevent form submission
    formdata.append("name", formField.name);
    formdata.append("email", formField.email);
    formdata.append("phone", formField.phone);
    formdata.append("password", formField.password);

    if (
      formField.name !== "" &&
      formField.email !== "" &&
      formField.phone !== ""
    ) {
      const user = JSON.parse(localStorage.getItem("user")); // Get the current user data

      try {
        await editdata(`/api/user/${user?.userId}`, formField).then((res) => {
          // Debug log to check response data
          console.log("Response from API:", res);
          // Set success alert if the response is valid
          setTimeout(() => {
            setAlertBox({
              open: true,
              msg: "Profile is Updated!",
              error: false,
            });
          }, 2000);
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        setAlertBox({
          open: true,
          msg: "Failed to update profile.",
          error: true,
        });
      }
    }
  };

  // const editPasswordChange = async (e) => {
  //   e.preventDefault(); // Prevent form submission
  //   formdata.append("password", field.password);

  //   if ( field.oldPassword !== "" && field.password !== "" && field.confirmPassword !== "") {
  //     // const user = JSON.parse(localStorage.getItem("user"));
  //     console.log(field)
  //   }else{
  //     setAlertBox({
  //       open: true,
  //       msg: "Please fill all fields",
  //       error: true,
  //     });
  //     return false;
  //   }
  // };

  return (
    <div>
      <div className="right-content">
        <section className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">My Account</h3>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Edit Profile" {...a11yProps(0)} />
                {/* <Tab label="Change Password" {...a11yProps(1)} /> */}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <form onSubmit={editProfile}>
                <div className="row">
                  {/* <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <div className="userimg">
                      <img
                        src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                        alt=""
                      />
                      <div className="overlays d-flex align-items-center justify-content-center">
                        <IoMdCloudUpload />
                        <input type="file" />
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="FirstName"
                            variant="outlined"
                            className="w-100"
                            name="name"
                            value={formField.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Email"
                            variant="outlined"
                            disabled
                            name="email"
                            className="w-100"
                            value={formField.email}
                            // onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="PhoneNumber"
                            variant="outlined"
                            className="w-100"
                            name="phone"
                            value={formField.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-center align-items-center mt-3">
                      <Button
                        type="submit"
                        variant="contained"
                        className="w-50"
                      >
                        {" "}
                        Save{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
              <form onSubmit={editPasswordChange}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            label="Old Password"
                            variant="outlined"
                            className="w-100"
                            name="oldPassword"
                             onChange={handleInputChange2}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            label="New Password"
                            variant="outlined"
                            className="w-100"
                            name="password"
                             onChange={handleInputChange2}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            label="Confirm Password"
                            variant="outlined"
                            className="w-100"
                            name="confirmPassword"
                             onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-center align-items-center mt-3">
                      <Button type="submit" variant="contained" className="w-50">
                        {" "}
                        Save{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CustomTabPanel> */}
          </Box>
        </section>
      </div>
    </div>
  );
}
