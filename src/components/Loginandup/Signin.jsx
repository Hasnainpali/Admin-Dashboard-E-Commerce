import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contextApi/UserAuthContext';
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import './Sign.css';  // Make sure to import the CSS file
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, CircularProgress } from '@mui/material';
import { FcGoogle} from "react-icons/fc";
import {LuPhone } from 'react-icons/lu'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { postData, postdata } from '../../utility/Api';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Signin() {
  const { setisHeaderSidebar,setAlertBox, user, setUser  } = useContext(UserContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formFields, setformFields] = useState({
       name:"",
       email:"",
       phone:"",
       password:"",
       isAdmin:true
  })

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const changeInput = (e) => {
    setformFields({
      ...formFields,
      [e.target.name]: e.target.value
    });
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      const { name, phone, email, password } = formFields;

      if (!name || !phone || !email || !password) {
        setAlertBox({
          open: true,
          error: true,
          msg: "Please fill out all fields"
        });
        setLoading(false)
        return;
      }
  
      try {
        const res = await postdata('/api/user/signup', formFields);
        console.log(res);
         if(res.status !== false){
          setAlertBox({
            open: true,
            error: false,
            msg: "User Successfully Registered"
          });
          setTimeout(() => {
            setLoading(false)
            const container = document.getElementById('containers');
            container.classList.remove('right-panel-active');
          }, 2000);
         }else{
           setAlertBox({
            open:true,
            error:true,
            msg:res.msg
           })
           setLoading(false)
         }
      } catch (err) {
        setAlertBox({
          open: true,
          error: true,
          msg: "Registration failed. Please try again."
        });
      }
    }catch (error){
      console.log(error)
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { email, password } = formFields;

    if (!email || !password) {
      setAlertBox({
        open: true,
        error: true,
        msg: "Please fill out all fields"
      });
      setLoading(false)
      return;
    }

    try {
      const res = await postdata('/api/user/signin', formFields);
       if(res.status !== false){
        localStorage.setItem("token", res.token);
      const user = {
        userId:res.user?.id,
        name: res.user?.name,
        email: res.user?.email
      };
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        setLoading(false)
        window.location.href = '/'
        setAlertBox({
          open: true,
          error: false,
          msg: "User Login Successfully"
        });
      }, 3000);
       }else{
        setAlertBox({
          open:true,
          error:true,
          msg:res.msg
        })
        setLoading(false)
       }
    } catch (err) {
      console.error("Login Error:", err);
      setAlertBox({
        open: true,
        error: true,
        msg: "Login failed. Please try again."
      });
    }
  };

  useEffect(() => {
    setisHeaderSidebar(true);

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('containers');

    const addRightPanelActive = () => container.classList.add('right-panel-active');
    const removeRightPanelActive = () => container.classList.remove('right-panel-active');

    signUpButton.addEventListener('click', addRightPanelActive);
    signInButton.addEventListener('click', removeRightPanelActive);

    return () => {
      signUpButton.removeEventListener('click', addRightPanelActive);
      signInButton.removeEventListener('click', removeRightPanelActive);
    };
  }, [setisHeaderSidebar]);

  return (
    <div className="containers" id="containers">
      
    <div className='form-containers sign-in-containers m-auto'>
     <form className='d-flex align-items-center justify-content-center ' onSubmit={login}>
     <div className='container-fluid shadow-lg'>
        <h1 className='text-center fs-2 mt-3 mb-2'>
          <span className='text-dark'>Multi</span>
          <span className="text-warning">Shop</span>
        </h1>
        <h4 className='my-2 text-dark text-center weight'>Sign In</h4>

        <div className='inputField'>
         <div className='email-input-wrapper'>
          <span className='email-toggle-icon'><MdEmail/></span>
         <input 
            type="email" 
            value={formFields.email}
            name='email'
            onChange={changeInput}
            placeholder='Email' 
            autoFocus
           
          />
         </div>
          <div className='password-input-wrapper passwordIcon'>
            <span className='password-icon'><RiLockPasswordFill/></span>
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              value={formFields.password}
              name='password'
              onChange={changeInput}
              placeholder='Password' 
           
            />
            <span onClick={togglePasswordVisibility} className='password-toggle-icon'>
              {passwordVisible ? <FaEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <div>
            <a href='#' className='text my-2'>Forgot Password?</a>
          </div>
        </div>
       <div className="d-flex justify-content-center align-items-center w-100 my-2 ">
        <Button id='signup' type='submit' variant='contained' className='lh-0'>
          {
            loading === true ?  <CircularProgress/> : " Login  "
          }
        </Button>
       </div>
       <div className="d-flex  align-items-center w-100 my-2">
       <span className='text-dark' style={{ fontSize: "16px" }}>Not Register?Click here </span>
       <Button variant='text' className='text my-2' id="signUp">SignUp</Button>
       </div>
        <div className="d-flex justify-content-center align-items-cente w-100 or my-2">
          <span className="line"></span>
          <span className="txt">or</span>
          <span className="line"></span>
        </div>
        <div className="m-auto google">
           <Button variant='contained' >
            <span className="icon"><FcGoogle/></span>
            Sign in with Google </Button>
        </div>
        {/* <div className="d-flex mt-3 justify-content-center align-items-center">
          <span className='text-dark font-weight-normal '>Not Register?
            <a href='/signup' className='text'>Sign Up</a>
          </span>
        </div> */}
      </div>
     </form>
    </div>

    <div className='form-containers sign-up-containers'>
     <form className='d-flex align-items-center justify-content-center' onSubmit={register}>
     <div className="container-fluid  shadow-lg">
        <h1 className="text-center fs-2  my-3">
          <span className="text-dark">Multi</span>
          <span className="text-warning">Shop</span>
        </h1>
        <h4 className="my-2 text-dark text-center weight">Register Here</h4>

        <div className="inputField">
          <div className="firstlastName-input-wrapper">
            <span className="firstlastName-toggle-icon">
              {" "}
              <FaUser />{" "}
            </span>
            <input
              type="text"
              value={formFields.name}
              name='name'
              onChange={changeInput}
              placeholder="First Name"
              
            />
          </div>
          <div className="phoneNo-input-wrapper">
            <span className="phoneNo-toggle-icon">
              {" "}
              <LuPhone />
            </span>
            <input
              type="text"
              value={formFields.phone}
              name='phone'
              onChange={changeInput}
              placeholder="Phone Number"
            />
          </div>
          <div className="email-input-wrapper">
            <span className="email-toggle-icon">
              <MdEmail />
            </span>
            <input
              type="email"
              value={formFields.email}
              name='email'
              onChange={changeInput}
              placeholder="Email"
            />
          </div>
          <div className="password-input-wrapper passwordIcon">
            <span className="password-icon">
              <RiLockPasswordFill />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              value={formFields.password}
              name='password'
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
        </div>
        <div className="d-flex align-items-center w-100">
         <Checkbox {...label} />
          <span className="text-dark font-weight-normal"> I Agree to all <a href="/">Term And Condition</a></span>
        </div>
        <div className="d-flex justify-content-center align-items-center w-100 my-2  my-2">
          <Button
            id="signup"
            type='submit'
            variant="contained"
            className="lh-0"
          >
          {
            loading === true ?  <CircularProgress/> : " Sign Up "
          } 
          </Button>
        </div>
        <div className="d-flex  align-items-center w-100 my-2">
        <span className='text-dark' style={{ fontSize: "16px" }}>Already Register?Click here </span>
        <Button variant='text' className='text my-2' id="signIn">SignIn</Button>
       </div>
        <div className="d-flex justify-content-center align-items-center w-100 or my-2">
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
        {/* <div className=" d-flex mt-3 justify-content-center align-items-center ">
          <span className="text-dark font-weight-normal ">
            Already at Account?
            <a href="/signin" className="text ">
              Sign in
            </a>
          </span>
        </div> */}
      </div>
     </form>
    </div>

  <div class="overlay-containers">
  <div class="overlay">
      <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>
              To keep connected with us please login with your personal info
          </p>
         <div className="d-flex">
         {/* <Button variant='contained' color='warning' id="signIn">Sign In</Button> */}
         <Link to='/'>
         <Button variant='contained' color='warning' className='ml-2'  >Go Home</Button>
         </Link>
         </div>
       </div>
      <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <div className="d-flex ">
          {/* <Button variant='contained' color='warning' id="signUp" >Sign Up</Button> */}
          <Link to='/'>
            <Button variant='contained' color='warning' className='ml-2'  >Go Home</Button>
           </Link>
          </div>
      </div>
  </div>
  </div>


  </div>
    
  );
}
