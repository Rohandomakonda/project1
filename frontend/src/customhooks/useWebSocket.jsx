import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { unstable_useEnhancedEffect } from '@mui/material';

function useWebSocket() {
  const [unseenEventsCount, setUnseenEventsCount] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_WS

  useEffect(() => {
    // Create SockJS connection
    const socket = new SockJS(`${API_BASE_URL}`);

    // Create STOMP client and connect
    const stompClient = new Client({
      webSocketFactory: () => socket, // Use SockJS connection as the WebSocket connection
      reconnectDelay: 5000, // Reconnect after 5 seconds if disconnected
      onConnect: () => {
        console.log("Connected to WebSocket");
          // Subscribe to the notifications topic for this user
          stompClient.subscribe(`/topic/notifications`, (message) => {
            console.log("Broadcast notification received:", message.body);
            setUnseenEventsCount((prev) => prev + 1); // Increment unseen events count
            localStorage.setItem('unseen',unseenEventsCount);
          });  
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (error) => {
        console.error("WebSocket error:", error);
      },
    });

    stompClient.activate(); // Activate the STOMP client to start receiving messages
    // Cleanup on component unmount
    return () => {
      stompClient.deactivate();
    };
  }, []); 

  useEffect(()=>{
      console.log("unseenEventsCount is "+unseenEventsCount);
      localStorage.setItem('unseen',unseenEventsCount);
  },[unseenEventsCount])

  return { unseenEventsCount };
}

export default useWebSocket;
