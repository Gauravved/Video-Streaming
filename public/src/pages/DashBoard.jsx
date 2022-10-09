import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import Header from '../components/Header';

function DashBoard() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const menuHandler = (e,index,text)=>{
    console.log();
    if(text === "Log Out"){
        localStorage.removeItem('video-streamer');
        window.location.reload();
    }
    if(text === "Log In"){
        navigate("/login");
    }
    if(text === "Create Channel"){
        navigate("/registration");
    }
    if(text === "My Profile"){
      navigate('/myprofile', {state: {currentUser}});
    }
  }
  useEffect(()=>{
    defaultFunction();
    async function defaultFunction(){
      if(localStorage.getItem('video-streamer')){
        setCurrentUser(await JSON.parse(localStorage.getItem('video-streamer')))
      }
    }
  },[]);
  return (
    <>
      <ToastContainer></ToastContainer>
      <Container>
        <Header currentUser={JSON.parse(localStorage.getItem('video-streamer'))} menuHandler={menuHandler} ></Header>
      </Container>
    </>
  )
}

export default DashBoard

const Container = styled.div``; 
