import React,{useState} from 'react'
import Icon from 'react-icons-kit';
import noprofile from '../assets/no_profile.png'
import { logOut, user, edit } from 'react-icons-kit/feather';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logIn } from 'react-icons-kit/feather';
import { plusSquare } from 'react-icons-kit/feather';
import logo from '../assets/Logo2.png'

export default function Header({currentUser}) {
    const navigate = useNavigate();
    const icons = [user,edit, logOut ];
    const text = ["My Profile", "Edit", "Log Out"];
    const loginText = ["Log In", "Create Channel"];
    const loginIcons = [logIn, plusSquare];
    const [open, setOpen] = useState(false);
    
  const menuHandler = (e,index,text)=>{
    console.log();
    if(text === "Log Out"){
        localStorage.removeItem('video-streamer');
        navigate("/");
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
    if(text === "Edit"){
        navigate("/editprofile",{ state: {currentUser} });
    }
  }
    const DropDownList = (props)=>{
        return(
            <li className='dropdownitem' onClick={(e)=>{menuHandler(e,props.index, props.text)}}>
                <Icon icon={props.img} size={20} style={{opacity:"0.5", marginRight:"10px"}} />
                {props.text}
            </li>
        )
    } 
    return (
        <HeaderContainer>
            {/* <h3 className='title' >Video Streamer</h3> */}
            <img src={logo} alt="" className='logo' onClick={()=>{navigate("/")}} />
            {
                currentUser ?
                <>
                    <div className="drop-down">
                        {
                            currentUser.profile === "" ?
                            <>
                                <img src={noprofile}  onClick={()=>{setOpen(!open)}} />
                            </>
                            :<>
                                <img src="" alt=""  onClick={()=>{setOpen(!open)}} />
                            </>
                        }
                        <div className={`dropdownmenu ${open ? "active":"inactive"}`}>
                            <h3>
                                {currentUser.channelName}
                                <span>
                                    <br />
                                    {currentUser.email}
                                </span>
                            </h3>
                            <ul>
                            {
                                icons.map((icon,index)=>{
                                    return(
                                        <>
                                            <DropDownList img={icon} text={text[index]} index={index} />
                                        </>
                                    );
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="drop-down">
                        <img src={noprofile}  onClick={()=>{setOpen(!open)}} />
                        <div className={`dropdownmenu ${open ? "active":"inactive"}`}>
                            <h3>
                                Guest User
                                <span>
                                    <br />
                                    No email
                                </span>
                            </h3>
                            <ul>
                            {
                                loginIcons.map((icon,index)=>{
                                    return(
                                        <>
                                            <DropDownList img={icon} text={loginText[index]} index={index} />
                                        </>
                                    );
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </>
            }
        </HeaderContainer>
    )
}
const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 98%;
    top: 0px;
    height: auto;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.5);
    background-color: red;
    .logo{
        height: 45px;
        width: 170px;
        padding-left: 30px;
        cursor: pointer;
    }
    .title{
        padding-left: 14px;
        text-transform: capitalize;
        color: white;
    }
    .drop-down{
        height: auto;
        align-items: center;
        justify-content: center;
        display: flex;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid grey;
            cursor: pointer;
            overflow: hidden;
        }
    }
    .dropdownmenu{
        position: absolute;
        top: 80px;
        right: 20px;
        background-color: #cccbcb;
        border-radius: 10px;
        padding: 10px 20px;
        width: auto;
        ::before{
            content: '';
            position: absolute;
            top: -5px;
            right: 10px;
            height: 20px;
            width: 20px;
            background: #cccbcb;
            transform: rotate(45deg);
        }
        h3{
            width: 100%;
            text-align: center;
            font-size: 18px;
            padding: 20px 0;
            font-weight: 500;
            color: black;
            line-height: 1.2rem;
            span{
                font-weight: 400;
                color: #4b3535;
                font-size: 14px;
            }
        }
    }
    ul{
        list-style: none;
        .dropdownitem{
            padding: 10px;
            cursor: pointer;
            display: flex;
            align-items: flex-start;
            transition: 400ms ease-in-out ;
            :hover{
                color: red;
            }
        }
    }
    .dropdownmenu.inactive{
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
        transition: 500ms ease-in-out;
    }
    .dropdownmenu.active{
        opacity: 1;
        visibility: visible;
        transition: 0.5s ease-in-out;
        transform: translateY(0);
    }
`
