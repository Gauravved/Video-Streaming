import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import Header from '../components/Header';

function DashBoard() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
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
      <Header currentUser={JSON.parse(localStorage.getItem('video-streamer'))} ></Header>
      <Container>
      </Container>
    </>
  )
}

export default DashBoard

const Container = styled.div``; 
