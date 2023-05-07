import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from '../context/appContext';
import { addNotifications, resetNotifications } from "../features/userSlice";

function Room() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));


  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });


  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }


  if (!user) {
    return <></>
  }


  return (
    
    <div className="overflow-y-scroll scrollbar-hide h-[80vh]">
      <h2 className=' text-3xl p-4  text-center '> Available rooms</h2>
      
      <ul className="p-0">
        {
          rooms.map((room, idx) => (
            <li key={idx} className={`p-2 text-siebarText flex justify-between cursor-pointer ${room == currentRoom ? " bg-selectSidebar" : ""}`}
              onClick={() => joinRoom(room)}

            >{room} {currentRoom !== room && <span className=""></span>}
            </li>
          ))
        }
      </ul>
      </div>
    
  )
}

export default Room;