import { io } from "socket.io-client";
import { backendURL } from "../constants";

// Configuration
const socket = io(backendURL, { 
    withCredentials: true, 
    autoConnect: false 
});

// Connect socket
export const connectSocket = () => {
    try 
    {
        // Destroy previous instance and listeners if exist
        if(socket.connected)
        {
            socket.removeAllListeners();
            socket.disconnect();
        }
        
        // Fresh connection
        if(!socket.connected) socket.connect();        
    } 
    catch(error) 
    {
        console.log("Failed to connect or disconnect socket error:", error.message);
    }
};

// Disconnect socket
export const disconnectSocket = () => {
    try 
    {
        if(socket.connected)
        {
            socket.removeAllListeners();
            socket.disconnect();
        }
    } 
    catch(error) 
    {
        console.log("Failed to disconnect socket", error.message);
    }
};

export default socket;