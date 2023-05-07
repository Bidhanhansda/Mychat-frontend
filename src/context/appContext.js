import { io } from "socket.io-client";
import React from "react";
const SOCKET_URL = "https://mychat-backend-yymy.onrender.com";
export const socket = io(SOCKET_URL);

export const AppContext = React.createContext();