import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from '../context/appContext';
import { addNotifications, resetNotifications } from "../features/userSlice";

function Sidebar() {

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
    fetch("https://mychat-backend-yymy.onrender.com/rooms")
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
    <>
    <div className="overflow-y-scroll scrollbar-hide h-[80vh]">
      {/* <h2 className=' text-3xl p-4'> Available rooms</h2>
      <ul className="p-0">
        {
          rooms.map((room, idx) => (
            <li key={idx} className={`p-2 flex justify-between cursor-pointer ${room == currentRoom ? " bg-green-300" : ""}`}
              onClick={() => joinRoom(room)}

            >{room} {currentRoom !== room && <span className=""></span>}
            </li>
          ))
        }
      </ul> */}
      <h2 className=' text-3xl text-center p-4'> Members</h2>
      <ul className="p-0">
        {
          members.map((member) => (
            <li key={member.id} className={`p-2 flex justify-between cursor-pointer ${privateMemberMsg?._id == member?._id ? " bg-selectSidebar" : ""} ${member._id === user._id ? " pointer-events-none opacity-60" : ""}`}
              onClick={() => handlePrivateMemberMsg(member)} >

              <div className=" flex flex-1 ">
                <div className=" flex mb-0 relative mr-1 justify-between p-2">
                  <img src={member.picture} className=" w-[30px] h-[30px] rounded-full object-cover" />
                  {member.status == "online" ? <i className="fas fa-circle text-green-700 bg-green-700 text-[11px] absolute -z-50 bottom-0 left-3  "></i> : <i className="fas fa-circle text-orange-300 text-[11px] absolute -z-50 bottom-0 left-3   "></i>}
                </div>

                <div className=" flex justify-start items-center mr-1 text-siebarText">
                  {member.name}
                  
                  {member._id === user?._id && " (You)"}
                  {member.status == "offline" && " (Offline)"}
                </div>

                <div className="">
                {/* <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span> */}
                </div>
              </div>

            </li>
          ))
        }
      </ul>
      </div>
    </>
  )
}

export default Sidebar;