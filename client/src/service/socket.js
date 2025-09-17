import { io } from "socket.io-client";
import { backendURL } from "../constants";

// Configuration
const socket = io(backendURL, { 
    withCredentials: true, 
    autoConnect: false 
});

// Connect with backend
export const connectSocket = () => {
    // Remove previous listeners
    socket.removeAllListeners();

    try 
    {
        // Destroy previous instance if exist
        if(socket.connected) socket.disconnect();
        
        // Fresh connection
        if(!socket.connected) socket.connect();        
    } 
    catch(error) 
    {
        console.log("Failed to connect or disconnect socket error:", error.message);
    }
};

export default socket;