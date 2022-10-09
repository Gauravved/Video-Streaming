import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {eye,eyeOff} from 'react-icons-kit/feather';
import axios from 'axios';
import { login } from '../utils/APIRoute';
import background from '../assets/background.jpg'

function Login() {
  const navigate = useNavigate();
  const toastCss = {
    theme: "dark",
    pauseOnHover: true,
    position: "top-right",
    autoClose: 3000,
  }
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: ""
  });
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('video-streamer')) !== null){
      navigate("/");
    }
  },[]);

  const changeHandler = (e)=>{
    setLoginValues({...loginValues, [e.target.name]: e.target.value});
  }
  const submitHandler = async (e)=>{
    e.preventDefault();
    const {email, password} = loginValues;
    if(email.length === 0){
      toast.error("Email must not be empty",toastCss);
    }
    else if(password.length < 8){
      toast.error("Password must contain minimum 8 letters",toastCss);
    }
    else{
      const { data } = await axios.post(login, {email, password});
      if(data.status === false){
        toast.error(data.msg,toastCss);
      }
      else{
        delete data.user.password;
        localStorage.setItem('video-streamer',JSON.stringify(data.user));
        navigate("/");
      }
    }
  }
  const [type, setType] = useState('password');
  const [typeIcon, setTypeIcon] = useState(eyeOff);
  const toogleHandler = ()=>{
    if(type === 'password'){
      setType('text');
      setTypeIcon(eye);
    }
    else{
      setType('password');
      setTypeIcon(eyeOff);
    }
  }
  return (
    <>
      <ToastContainer/>
      <FormContainer>
        <form onSubmit={(e)=>{submitHandler(e)}}>
          <div className="heading">
            <h1>Login</h1>
          </div>
          <input type="email" placeholder='Email' name='email' id='email' onChange={(e) => {changeHandler(e)}} />
          <div className="passwordFields">
            <input type={type} name='password' id='password' placeholder='Password' onChange={(e) => {changeHandler(e)}} />
            <span className='icon'><Icon icon={typeIcon} size={25} onClick={()=>{toogleHandler()}} /></span>
          </div>
          <p>Don't have a channel? <Link to="/registration" className='link'>Create a new channel</Link> </p>
          <button type='submit'>Login</button>
        </form> 
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
background-image: url(${background});
background-size: cover;
height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1rem;
.heading{
  align-items: center;
  justify-content: center;
  gap: 1rem;
  display: flex;
  h1{
    text-transform: uppercase;
  }
}
form{
    background-color: #ffffff4c;
    display: flex;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    width: 30%;
    /* border: 2px solid black; */
    border-radius: 3rem;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-direction: column;
    padding: 5rem 8rem;
    input{
      width: 100%;
      height: 50px;
      background-color: transparent;
      outline: none;
      border: 1px solid black;
      border-bottom: 2px solid black;
      border-radius: 5px;
      font-size: 18px;
      padding-left: 16px;
      color: black;
      caret-color: black;
      transition: 0.4s ease-in-out;
      :hover{
        border: 1px solid #4be3fa;
        border-bottom: 2px solid #4be3fa;
      }
      :focus{
        border: 1px solid #4be3fa;
        border-bottom:  2px solid #4be3fa;
      }
      ::-webkit-input-placeholder{
        color: black;
      }
    }
    button{
      height: auto;
      border-radius: 10px;
      outline: none;
      background-color: #51c351;
      padding: 15px;
      border: 2px solid #51c351;
      font-size: 18px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;	
      cursor: pointer;
      color: white;
      font-weight: bold;
      transition: 0.4s ease-in-out;
      :hover{
        color: #51c351;
        background-color: transparent;
      }
    }
    .passwordFields{
      display: grid;
      justify-content: space-between;
      align-items: center;
      width: 110%;
      grid-template-columns: 85% 15%;
      padding-left: 25px;
      input{
        width: 107%;
      }
      span{
        cursor: pointer;
        justify-content: center;
        align-items: center;
        padding-left: 10px;
      }
    }
  }
  .link{
    color: #cdc58a;
    text-decoration : none;
    :hover{
      text-decoration: underline;
    }
  }
`;

export default Login