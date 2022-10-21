import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import background from '../assets/background.jpg'


function MyProfile() {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(location.state.currentUser);
    // useEffect(()=>{
    //     fetchData();
    //     async function fetchData() {
    //         setCurrentUser(await location.state.currentUser);
    //     }
    // },[]);
    return (
        <>
        {/* <ToastContainer /> */}
        <Container>
            <Header currentUser={currentUser} />
            <form>
            <div className='heading'>
                <h1>My Profile</h1>
            </div>
            <div className='Information'>
              <label htmlFor="">Channel Name</label>
              <input readOnly='true' type="text" name='channelName' id='channelName' placeholder='Channel Name' value={currentUser.channelName}/>
            </div>
            <div className="Information">
              <label htmlFor="">Email </label>  
              <input readOnly='true' type={'email'} name='email' id='email' placeholder='Email Address' value={currentUser.email} />  
            </div>
            {/* <div className="passwordFields">
                <input type="password" name='password' id='password' placeholder='Password' /> */}
                {/* <span className='icon'><Icon icon={typePassIcon} size={20} onClick={()=>{toogleHandler()}} ></Icon></span> */}
            {/* </div> */}
            {/* <div className="passwordFields">
                <input type={typePass2} name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' onChange={(e)=>{changeHandler(e)}} />
                <span className='icon'><Icon icon={typePassIcon2} size={20} onClick={()=>{toogleHandler2()}} ></Icon></span>
            </div>
            <button type='submit'>Create Channel</button>
            <p>Already have an account? <Link to="/login" className='link' >Login</Link> </p> */}
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
      margin-bottom: 40px;
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
        .Information{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          label{
            font-size: large;
          }
        }
        input{
          background-color: #c4c4c4d5;
          width: 60%;
          height: 40px;
          cursor: not-allowed;
          outline: none;
          border: 1px solid black;
          border-bottom: 2px solid black;
          border-radius: 5px;
          font-size: 18px;
          padding-left: 16px;
          color: black;
          transition: 0.4s ease-in-out;
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
export default MyProfile