import React, { useState } from 'react';
import { chat } from '../assets';
import { UilBars, UilTimes } from "@iconscout/react-unicons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useLogoutUserMutation } from '../services/appApi';


function Navigation() {


  const [toggle, settoggle] = useState(false);
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutUser] = useLogoutUserMutation();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);

    window.location.replace("/");
  }


  return (
    <div className='xl:max-w-[1920px] w-full fixed bg-transparent flex justify-between z-50'>

<div className='flex justify-start items-start'>
        <img src={chat} alt="chat-logo" className='w-[40px] h-[40px] ' />
        <p className=' text-2xl px-2 text-white'>My-Chat</p>

      </div>

      {!user &&  (
      <ul className=' list-none sm:flex hidden justify-end items-center px-3 '>

        <li className={`font-normal cursor-pointer text-[16px] text-white  mr-2 px-4  `}>
          <Link style={{ textDecoration: 'none', color: "white"}} to="/" >Home</Link>
        </li>
        {!user &&
          (<li className={`font-normal cursor-pointer text-[16px] text-white  mr-2 px-4`}>
            <Link style={{ textDecoration: 'none', color: "white"}} to="/login" >Login</Link>
          </li>)
        }
        <li className={`font-normal cursor-pointer text-[16px] text-white  mr-2 px-4`}>
          <Link style={{ textDecoration: 'none', color: "white"}} to="/messeges" >Chat</Link>
        </li>
        {user && (
        <li className={`font-normal cursor-pointer text-[16px] rounded-sm bg-red-800 text-red-800  mr-2 px-2`}>

          <LogoutIcon style={{ textDecoration: 'none'}} onClick={handleLogout} />

        </li>)}



        
      </ul>)
      }
      {user && (
      <div>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{ color: "white"}}
        >
          Menu 
        </Button>
        <Menu
        
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}

        >
          <MenuItem  onClick={handleClose}>
          <Link style={{ textDecoration: 'none', color: "black"}} to="/" >Home</Link>
          </MenuItem>
          <MenuItem  onClick={handleClose}>
          <Link style={{ textDecoration: 'none', color: "black"}} to="/messeges" >Chat</Link>
          </MenuItem>
          {!user && (
          <MenuItem  onClick={handleClose}>
          <Link style={{ textDecoration: 'none', color: "black"}} to="/login" >Login</Link>
          </MenuItem>)}
          <MenuItem sx={{ color: "red" }}  onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div> )
      }

      


    </div>

  )
}

export default Navigation;