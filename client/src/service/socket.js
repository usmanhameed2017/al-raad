import { io } from "socket.io-client";
import { backendURL } from "../constants";

// Connect with backend
const socket = io(backendURL, { withCredentials: true });

export default socket;