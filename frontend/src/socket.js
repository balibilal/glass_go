
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000"; // Replace with your server URL
const socket = io(SOCKET_URL,  {
  transports: ["websocket"], // Optional: Force websocket transport
});

export default socket;