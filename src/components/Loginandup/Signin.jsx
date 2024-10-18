import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contextApi/UserAuthContext";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import "./Sign.css"; // Make sure to import the CSS file
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, CircularProgress } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { LuPhone } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { postData, postdata } from "../../utility/Api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Signin() {
  const { setisHeaderSidebar, setAlertBox, user, setUser } = useContext(
    UserContext
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formFields, setformFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: true,
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const changeInput = (e) => {
    setformFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formFields;

    if (!email || !password) {
      setAlertBox({
        open: true,
        error: true,
        msg: "Please fill out all fields",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await postdata("/api/user/signin", formFields);
      console.log("Login Response:", res); // For debugging

      if (!res.error) {
        // Check if there's no error
        // Save token and user information
        localStorage.setItem("token", res.token);
        const user = {
          userId: res.user?.id,
          name: res.user?.name,
          email: res.user?.email,
          phone: res.user?.phone,
        };
        localStorage.setItem("user", JSON.stringify(user));

        setAlertBox({
          open: true,
          error: false,
          msg: "User Login Successfully",
        });

        // Redirect after a short delay to allow the user to read the message
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setAlertBox({
          open: true,
          error: true,
          msg: res.msg || "Login failed. Please check your credentials.",
        });
      }
    } catch (err) {
      console.error("Login Error:", err);
      setAlertBox({
        open: true,
        error: true,
        msg: "Login failed. Please try again.",
      });
    } finally {
      setLoading(false); // Ensure loading stops regardless of outcome
    }
  };

  useEffect(() => {
    setisHeaderSidebar(true);

    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("containers");

    if (signInButton && container) {
      const removeRightPanelActive = () =>
        container.classList.remove("right-panel-active");

      signInButton.addEventListener("click", removeRightPanelActive);

      return () => {
        signInButton.removeEventListener("click", removeRightPanelActive);
      };
    }
  }, [setisHeaderSidebar]);

  return (
    <div className="containers" id="containers">
      <div className="form-containers sign-in-containers m-auto">
        <form
          className="d-flex align-items-center justify-content-center "
          onSubmit={login}
        >
          <div className="container-fluid shadow-lg">
            <h1 className="text-center fs-2 mt-3 mb-2">
              <span className="text-dark">Multi</span>
              <span className="text-warning">Shop</span>
            </h1>
            <h4 className="my-2 text-dark text-center weight">Sign In</h4>

            <div className="inputField">
              <div className="email-input-wrapper">
                <span className="email-toggle-icon">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  value={formFields.email}
                  name="email"
                  onChange={changeInput}
                  placeholder="Email"
                  autoFocus
                />
              </div>
              <div className="password-input-wrapper passwordIcon">
                <span className="password-icon">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={formFields.password}
                  name="password"
                  onChange={changeInput}
                  placeholder="Password"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon"
                >
                  {passwordVisible ? <FaEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <div>
                <a href="#" className="text my-2">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center w-100 my-2 ">
              <Button
                id="signup"
                type="submit"
                variant="contained"
                className="lh-0"
              >
                {loading === true ? <CircularProgress /> : " Login  "}
              </Button>
            </div>

            <div className="d-flex justify-content-center align-items-cente w-100 or my-2">
              <span className="line"></span>
              <span className="txt">or</span>
              <span className="line"></span>
            </div>
            <div className="m-auto google">
              <Button variant="contained">
                <span className="icon">
                  <FcGoogle />
                </span>
                Sign in with Google{" "}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div class="overlay-containers">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <div className="d-flex ">
              <Link to="/">
                <Button variant="contained" color="warning" className="ml-2">
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
