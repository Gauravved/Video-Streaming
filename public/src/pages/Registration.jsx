import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {eye, eyeOff} from 'react-icons-kit/feather';
import {Icon} from 'react-icons-kit';
import axios from 'axios';
import { registration } from '../utils/APIRoute';
import {Link, useNavigate} from 'react-router-dom';
import background from '../assets/background.jpg'

export default function Login() {
  const navigate = useNavigate();
  const toastCss = {
    theme: "dark",
    position: "top-right",
    pauseOnHover: true,
    autoClose: 3000,
  }
  const [values, setValues] = useState({
    channelName: "",
    email: "",
    password:"",
    confirmPassword:""
  });
  const [typePass, setTypePass] = useState("password");
  const [typePassIcon, setTypePassIcon] = useState(eyeOff);
  const [typePass2, setTypePass2] = useState("password");
  const [typePassIcon2, setTypePassIcon2] = useState(eyeOff);
  //handling submit
  const submitHandler = async (event) => {
    event.preventDefault();
    if(values.password.length < 8 || values.confirmPassword.length < 8){
      toast.error("Password must contain 8 letter",toastCss);
    }
    else if(values.password !== values.confirmPassword){
      toast.error("Password does not match",toastCss)
    }
    else if(values.email===""){
      toast.error("Email must not me empty",toastCss);
    }
    else if(values.channelName.length<=2){
      toast.error("Channel name must contain minimum 3 letters",toastCss);
    }
    else{
      console.log(registration);
      const { data } = await axios.post(registration,{
        channelName: values.channelName,
        email: values.email,
        password: values.password
      });
      if(data.status === false){
        toast.error(data.msg,toastCss);
      }
      else{
        delete data.user.password;
        localStorage.setItem('video-streamer',JSON.stringify(data.user));
        console.log(data.user);
        navigate("/");
      }
    }
  }
  //password Toogles
  const toogleHandler = ()=>{
    if(typePass==='password'){
      setTypePass('text');
      setTypePassIcon(eye);
    }
    else{
      setTypePass('password');
      setTypePassIcon(eyeOff);
    }
  }
  const toogleHandler2 = ()=>{
    if(typePass2 === 'password'){
      setTypePass2('text');
      setTypePassIcon2(eye);
    }
    else{
      setTypePass2('password');
      setTypePassIcon2(eyeOff)
    }
  }
  //changing values 
  const changeHandler = (event)=>{
    setValues({...values, [event.target.name]: event.target.value});
  }
  return (
    <>
      <ToastContainer />
      <Container>
        <form onSubmit={(event) => { submitHandler(event) }}>
          <div className='heading'>
            <h1>Create Account</h1>
          </div>
          <input type="text" name='channelName' id='channelName' placeholder='Channel Name' onChange={(e)=>{changeHandler(e)}} />
          <input type={'email'} name='email' id='email' placeholder='Email Address' onChange={(e)=>{changeHandler(e)}} />
          <div className="passwordFields">
            <input type={typePass} name='password' id='password' placeholder='Password' onChange={(e)=>{changeHandler(e)}} />
            <span className='icon'><Icon icon={typePassIcon} size={20} onClick={()=>{toogleHandler()}} ></Icon></span>
          </div>
          <div className="passwordFields">
            <input type={typePass2} name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' onChange={(e)=>{changeHandler(e)}} />
            <span className='icon'><Icon icon={typePassIcon2} size={20} onClick={()=>{toogleHandler2()}} ></Icon></span>
          </div>
          <button type='submit'>Create Channel</button>
          <p>Already have an account? <Link to="/login" className='link' >Login</Link> </p>
        </form>
      </Container>
    </>
  )
}

const css = {
  border: "1px solid #4be3fa",
  borderBottom: "2px solid #4be3fa",
}
const Container = styled.div`
  background: url(${background});
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
      padding: 2rem 5rem;
      input{
        /* background-color: white; */
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
        transition: 0.4s ease-in-out;
        :hover{
          border: 1px solid #4be3fa;
          border-bottom: 2px solid #4be3fa;
        }
        :focus{
          ${css}
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
        font-size: 17px;
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
`
