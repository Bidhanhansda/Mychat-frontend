import React from 'react';
import { chat } from '../assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {

  const user = useSelector((state) => state.user);
   
  return (
    <div className='xl:max-w-[1920px] w-full home-background'>
    <div className=' flex flex-col items-center justify-center text-center md:pt-80 pt-44 '>
      <div className='flex sm:flex flex-col items-center justify-center  text-center  '>
        <img src={chat} alt="chat-logo" className='w-[140px] h-[140px] rounded-full shadow-xl shadow-blue-400'/>
        <h1 className=' sm:text-[72px] text-[60px] p-4 font-medium text-gradient  shadow-xl rounded-full shadow-orange-300 font-home'>Welcome to My-Chat</h1>
      </div>
      <button className=' text-emerald-600 bg-blue-gradient p-6 mt-6 rounded-full text-[24px] font-medium shadow-xl shadow-purple-300 hover:scale-110 font-homeButton '>
      {user ?
      <Link style={{ textDecoration: 'none', color: "white",}} to="/messeges" >Get Started</Link>
      :<Link style={{ textDecoration: 'none', color: "white"}} to="/login" >Get Started</Link>}
      </button>
    </div>
    </div>
  )
}

export default Home;