import React, { useState } from 'react'
import Sidebar from "../components/Sidebar";
import Messegeform from "../components/Messegeform";
import Room from "../components/Room";
import { UilTimes, UilUserSquare } from "@iconscout/react-unicons";

function Messeges() {
  let width = screen.width;
  console.log(width);
  const cheak = (width > 1080);
  console.log(cheak)

  const [toggle, settoggle] = useState(false);




  if (cheak) {
    return (

      <div className='xl:max-w-[1920px] w-full  fixed md:flex-row flex-col flex  bg-appBackground p-12 justify-between items-center md:overflow-clip  overflow-y-scroll font-homeButton   md:scrollbar-hide scrollbar-hide h-[100vh] '>

        <div className='flex-col justify-center  w-full md:w-[20%] m-4 border-1 rounded-2xl bg-componentBackground items-center shadow-xl   '>
          <Sidebar />
        </div>
        <div className='flex-col justify-center w-full md:w-[60%] m-4  rounded-2xl '>
          <Messegeform />
        </div>
        <div className='flex-col justify-center w-full md:w-[20%] m-4 border-1 rounded-2xl bg-componentBackground shadow-xl'>
          <Room />
        </div>
      </div>


    )

  }

  else {
    return (



      <div className={` xl:max-w-[1920px] w-full  fixed flex-col flex  bg-appBackground py-10 px-2 justify-between items-center   scrollbar-hide h-[100vh] font-homeButton  `}>
        <div className=' sm:hidden  flex-col absolute z-10 flex-1 justify-end h-[10vh] items-center '>
          <div className='flex justify-center items-center'>

            {toggle ?
              <UilTimes className=' w-[28px] h-[28px] object-contain text-black'
                onClick={() => settoggle((prev) => !prev)} />
              :
              <UilUserSquare className=' w-[28px] h-[28px] object-contain text-black'
                onClick={() => settoggle((prev) => !prev)} />}

          </div>
          <div className={`  ${toggle ? "flex" : "hidden"} flex justify-center   items-center w-full `}>

            <div className='flex-col justify-center  w-[50%] mx-1  border-1 rounded-2xl bg-componentBackground items-center shadow-xl   '>
              <Sidebar />
            </div>

            <div className='flex-col justify-center w-[50%] mx-1  border-1 rounded-2xl bg-componentBackground shadow-xl'>
              <Room />
            </div>
          </div>
        </div>


        <div className='flex-col pt-4 justify-center w-full md:w-[60%] h-[80vh] m-4  rounded-2xl '>
          <Messegeform />
        </div>

      </div>


    )
  }
}

export default Messeges;