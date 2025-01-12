import { Buffer } from "buffer";
// Polyfills for browser environment
if (typeof window !== "undefined") {
  // @ts-ignore
  window.global = window
  // @ts-ignore
  window.process = {
    env: { DEBUG: undefined }
  }
  // @ts-ignore
  window.Buffer = window.Buffer || Buffer;
}

import { Client } from "@stomp/stompjs"
import { useEffect, useRef, useState } from "react"
import SockJS from "sockjs-client"

export const useWebSocket = ({
  brokerURL,
  onConnect,
  onDisconnect,
  onError
}) => {
  const client = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
   
    const ws = new SockJS(brokerURL)
    client.current = new Client({
      webSocketFactory: () => ws,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    })
    
    client.current.onConnect = () => {
      setIsConnected(true)
      onConnect?.()
    }

    client.current.onDisconnect = () => {
      setIsConnected(false)
      onDisconnect?.()
    }

    client.current.onStompError = frame => {
      onError?.(new Error(frame.headers["message"]))
    }

    client.current.onWebSocketError = event => {
      onError?.(new Error("WebSocket error occurred"))
    }

    client.current.activate()
   
    return () => {
      if (client.current) {
        client.current.deactivate()
      }
    }
  }, [brokerURL, onConnect, onDisconnect, onError])

  const subscribe = (destination, callback) => {

    if (!client.current || !isConnected) {
      console.warn("WebSocket is not connected")
      return
    }

    return client.current.subscribe(destination, message => {
      try {
        const payload = JSON.parse(message.body)
        callback(payload)
      } catch (error) {
        console.error("Error parsing message:", error)
      }
    })
  }

  const send = (destination, body) => {
    if (!client.current || !isConnected) {
      console.warn("WebSocket is not connected")
      return
    }

    client.current.publish({
      destination: `/app${destination}`,
      body: JSON.stringify(body)
    })
  }

  return {
    isConnected,
    subscribe,
    send
  }
}
