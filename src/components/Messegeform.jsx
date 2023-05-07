import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { AppContext } from '../context/appContext';


import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';


function Messegeform() {

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }



  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {

    setMessages(roomMessages);
  });



  function handleSubmit(e) {
    e.preventDefault();

    if (!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);

    setMessage("");
  }

  function handleChange(e) {
    if (e.target.value.length > 4096) {
      const val = e.target.value.slice(0, 4095);
      setMessage(val);
    } else {
      setMessage(e.target.value);
    }


  }

  return (
    <>
      <div className=' md:h-[80vh] h-[70vh] border-1 drop-shadow-xl rounded-2xl overflow-y-scroll scrollbar-hide bg-componentBackground '>

        {user && !privateMemberMsg?._id && <div className="alert alert-info">You are in the {currentRoom} room</div>}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info p-0 mx-0 my-auto text-center h-24 mb-2">
              <div className=' flex justify-center items-center mt-2 text-black'>
                Your conversation with {privateMemberMsg.name} <img src={privateMemberMsg.picture} className=" w-[60px] h-[60px] object-cover mx-2 my-auto mb-7 rounded-full ml-2" />
              </div>
            </div>
          </>
        )}

        {!user && <div className=' w-full h-10 bg-red-700 text-center text-lg font-bold'>Please login</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx} >
              <div className='items-center flex justify-center'>
                <p className="alert alert-info text-center  w-[150px] mx-0 my-2 ">{date}</p>
              </div>
              {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                <div className={sender?.email == user?.email ? " flex justify-end mr-5 incoming-message" : "message"} key={msgIdx}>
                  <div className=" ml-5 mb-2 p-2 min-w-[200px] max-w-[90%] text-left min-h-[80px] inline-block rounded-tl-sm rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-green-800 message-inner ">
                    <div className="flex items-center mb-3">
                      <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                      <p className=" mb-1 font-bold">{sender._id == user?._id ? "You" : sender.name}</p>
                    </div>
                    <p className="message-content">{content}</p>
                    <p className=" text-sm font-light mt-2 text-end">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>


      <div className='  md:flex-col flex  justify-center  items-center rounded-2xl w-[100%] border-blue-700 mt-1  '>
        <form className='w-full  justify-center items-center flex' onSubmit={handleSubmit} >
          <div className='  justify-center  w-[80%] pr-1'>

            <TextField
              id="outlined-textarea"
              value={message}
              onChange={handleChange}
              fullWidth
              color="secondary"
              placeholder="Your messege"
              margin="normal"
              disabled={!user}
              InputProps={{ max: 10 }}
              multiline
              maxRows={3}
              sx={{
                "& .MuiInputBase-root": {
                  color: 'white'
                }
              }}
            />
          </div>
          <div className='  justify-center  items-center flex '>
            <Button type='submit' color="secondary" variant="contained" endIcon={<SendIcon />} disabled={!user}>
              Send
            </Button>

          </div>

        </form>
      </div>
    </>
  )
}

export default Messegeform;