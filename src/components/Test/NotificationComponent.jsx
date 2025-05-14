import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  // Helper function to get token
  const getAuthToken = () => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("Authentication token not found. Please login again.");
      return null;
    }
    
    return token;
  };

  useEffect(() => {
    // Get authentication token
    const token = getAuthToken();
    
    if (!token) {
      console.error("Authentication token not found");
      return;
    }
    
    // Create a new STOMP client with authentication
    const stompClient = new Client({
      // For production, use secure WebSocket (wss://)
      brokerURL: 'ws://localhost:8080/ws',
      
      // Connect headers with token
      connectHeaders: {
        Authorization: `Bearer ${token}` 
      },
      
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Set up subscription when connected
    stompClient.onConnect = function (frame) {
      console.log('Connected: ' + frame);
      setConnected(true);
      setError(''); // Clear any previous errors
      
      // Subscribe to the notifications topic
      stompClient.subscribe('/topic/notifications', function (message) {
        try {
          const receivedMessage = JSON.parse(message.body);
          console.log("Received:", receivedMessage);
          
          // Add new notification to state
          setNotifications((prevNotifications) => 
            [...prevNotifications, receivedMessage]
          );
        } catch (e) {
          console.log("Received plain text:", message.body);
          setNotifications((prevNotifications) => 
            [...prevNotifications, { content: message.body, timestamp: new Date().toISOString() }]
          );
        }
      }, {
        // Include token in subscription headers
        Authorization: `Bearer ${token}`
      });
      console.log("Successfully subscribed to notifications topic");
    };

    // Set up connection error handler
    stompClient.onStompError = function (frame) {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      setConnected(false);
      setError(`Connection error: ${frame.headers['message']}`);
    };

    stompClient.onWebSocketError = function (error) {
      console.error('WebSocket error:', error);
      setConnected(false);
      setError(`WebSocket error: ${error.message || 'Unknown error'}`);
    };
    
    // Add connection lost handler
    stompClient.onWebSocketClose = function(event) {
      console.log('WebSocket closed:', event);
      setConnected(false); 
      setError('Connection closed. Attempting to reconnect...');
    };

    // Define beforeConnect function to ensure fresh token on reconnects
    stompClient.beforeConnect = function() {
      const freshToken = getAuthToken();
      if (freshToken) {
        stompClient.connectHeaders = { 
          Authorization: `Bearer ${freshToken}` 
        };
      }
    };

    // Activate the client
    stompClient.activate();
    
    // Store client reference
    setClient(stompClient);

    // Clean up on unmount
    return () => {
      if (stompClient) {
        console.log("Disconnecting STOMP client");
        stompClient.deactivate();
      }
    };
  }, []);

  // Function to send a notification
  const sendNotification = () => {
    if (!client || !connected) {
      setError("Not connected to WebSocket server");
      return;
    }

    try {
      // Get the token again in case it was updated
      const token = getAuthToken();
      if (!token) return;

      const payload = JSON.stringify({ 
        content: message, 
        timestamp: new Date().toISOString() 
      });
      
      client.publish({
        destination: '/app/notify',
        body: payload,
        headers: {
          // Include authentication token in message headers
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Message sent successfully");
      
      // Clear message input
      setMessage('');
    } catch (error) {
      console.error("Failed to send message:", error);
      setError(`Failed to send message: ${error.message}`);
    }
  };

  return (
    <div className="notification-container">
      <h2>Real-time Notifications</h2>
      
      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="connection-status">
        Status: {connected ? 
          <span className="connected" style={{ color: 'green' }}>Connected</span> : 
          <span className="disconnected" style={{ color: 'red' }}>Disconnected</span>
        }
      </div>
      
      <div className="send-notification" style={{ margin: '15px 0' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter notification message"
          style={{ padding: '8px', marginRight: '10px', width: '60%' }}
          disabled={!connected}
        />
        <button 
          onClick={sendNotification} 
          disabled={!connected || !message}
          style={{ 
            padding: '8px 15px', 
            backgroundColor: connected && message ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Send Notification
        </button>
      </div>
      
      <div className="notifications-list">
        <h3>Received Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {notifications.map((notification, index) => (
              <li key={index} style={{ 
                borderBottom: '1px solid #eee',
                padding: '10px 0'
              }}>
                <strong>{new Date(notification.timestamp).toLocaleString()}</strong>: {notification.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NotificationComponent;