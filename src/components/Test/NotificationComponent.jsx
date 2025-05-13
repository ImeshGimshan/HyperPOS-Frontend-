import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';

function NotificationComponent() {
  // Add a ref to track connection attempts
  const connectionAttempts = useRef(0);
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  // Helper function to get token - with enhanced logging
  const getAuthToken = () => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    
    console.log(`[AUTH DEBUG] Token retrieved from localStorage: ${token ? "Found (length: " + token.length + ")" : "NULL"}`);
    
    if (!token) {
      setError("Authentication token not found. Please login again.");
      return null;
    }
    
    // Check if token has the expected format (usually JWT tokens start with "ey")
    if (typeof token === 'string' && !token.startsWith('ey')) {
      console.warn("[AUTH DEBUG] Token may be incorrectly formatted. Most JWT tokens start with 'ey'");
    }
    
    return token;
  };

  useEffect(() => {
    // Increment connection attempt counter
    connectionAttempts.current += 1;
    console.log(`[WS DEBUG] Connection attempt #${connectionAttempts.current}`);
    
    // Check if token is in localStorage
    const token = localStorage.getItem("token");
    console.log(`[WS DEBUG] Token exists in localStorage: ${token !== null}`);
    
    // Get authentication token
    const authToken = getAuthToken();
    
    if (!authToken) {
      console.error("[WS DEBUG] Authentication token not found, adding test token for debugging");
      // For testing purposes, add a token directly
      localStorage.setItem("token", "test-token-value");
      setError("No token found. Added test token for debugging. Refresh to try again.");
      return;
    }
    
    console.log(`[WS DEBUG] Creating STOMP client with token: ${authToken.substring(0, 5)}...`);
    
    // Create a new STOMP client with authentication
    const stompClient = new Client({
      // For production, use secure WebSocket (wss://)
      brokerURL: 'ws://localhost:8080/ws',
      
      // Connect headers with token - try different authorization header formats
      connectHeaders: {
        // Try standard format
        'Authorization': `Bearer ${authToken}`,
        // Some backends might expect these formats instead
        'auth-token': authToken,
        'access-token': authToken,
        'token': authToken
      },
      
      debug: function (str) {
        // Only log critical STOMP messages to reduce console noise
        if (str.includes('error') || str.includes('fail') || str.includes('connect')) {
          console.log('[STOMP DEBUG] ' + str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Set up subscription when connected
    stompClient.onConnect = function (frame) {
      console.log('[WS DEBUG] Connected: ' + frame);
      setConnected(true);
      setError(''); // Clear any previous errors
      
      // Get fresh token for subscription
      const subToken = getAuthToken();
      if (!subToken) {
        console.error('[WS DEBUG] Token missing when setting up subscription');
        return;
      }
      
      try {
        console.log('[WS DEBUG] Subscribing to /topic/notifications');
        // Subscribe to the notifications topic
        stompClient.subscribe('/topic/notifications', function (message) {
          console.log('[WS DEBUG] Message received from subscription');
          try {
            const receivedMessage = JSON.parse(message.body);
            console.log("[WS DEBUG] Received JSON:", receivedMessage);
            
            // Add new notification to state
            setNotifications((prevNotifications) => 
              [...prevNotifications, receivedMessage]
            );
          } catch (e) {
            console.log("[WS DEBUG] Received plain text:", message.body);
            setNotifications((prevNotifications) => 
              [...prevNotifications, { content: message.body, timestamp: new Date().toISOString() }]
            );
          }
        }, {
          // Try different auth header formats for subscription
          'Authorization': `Bearer ${subToken}`,
          'auth-token': subToken,
          'access-token': subToken,
          'token': subToken
        });
        console.log("[WS DEBUG] Successfully subscribed to notifications topic");
      } catch (subscribeError) {
        console.error("[WS DEBUG] Failed to subscribe:", subscribeError);
        setError(`Subscription error: ${subscribeError.message}`);
      }
    };

    // Set up connection error handler
    stompClient.onStompError = function (frame) {
      console.error('[WS DEBUG] Broker reported error: ' + frame.headers['message']);
      console.error('[WS DEBUG] Additional details: ' + frame.body);
      setConnected(false);
      setError(`Connection error: ${frame.headers['message']}`);
    };

    stompClient.onWebSocketError = function (error) {
      console.error('[WS DEBUG] WebSocket error:', error);
      setConnected(false);
      setError(`WebSocket error: ${error.message || 'Unknown error'}`);
    };
    
    // Add connection lost handler
    stompClient.onWebSocketClose = function(event) {
      console.log('[WS DEBUG] WebSocket closed. Code:', event.code, 'Reason:', event.reason);
      setConnected(false); 
      setError(`Connection closed (Code: ${event.code}). Attempting to reconnect...`);
    };

    // Define beforeConnect function to ensure fresh token on reconnects
    stompClient.beforeConnect = function() {
      const freshToken = getAuthToken();
      console.log('[WS DEBUG] beforeConnect called, token exists:', !!freshToken);
      
      if (freshToken) {
        // Try various header formats to increase chance of compatibility
        stompClient.connectHeaders = { 
          'Authorization': `Bearer ${freshToken}`,
          'auth-token': freshToken,
          'access-token': freshToken,
          'token': freshToken
        };
      }
    };

    // Activate the client
    console.log('[WS DEBUG] Activating STOMP client...');
    stompClient.activate();
    
    // Store client reference
    setClient(stompClient);

    // Clean up on unmount
    return () => {
      if (stompClient) {
        console.log("[WS DEBUG] Disconnecting STOMP client");
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
      if (!token) {
        console.error('[WS DEBUG] No token available when sending message');
        return;
      }

      const payload = JSON.stringify({ 
        content: message, 
        timestamp: new Date().toISOString() 
      });
      
      console.log('[WS DEBUG] Sending message:', message);
      
      client.publish({
        destination: '/app/notify',
        body: payload,
        headers: {
          // Try various header formats
          'Authorization': `Bearer ${token}`,
          'auth-token': token,
          'access-token': token,
          'token': token
        }
      });
      
      console.log("[WS DEBUG] Message sent successfully");
      
      // Clear message input
      setMessage('');
    } catch (error) {
      console.error("[WS DEBUG] Failed to send message:", error);
      setError(`Failed to send message: ${error.message}`);
    }
  };

  // Add token test and manual connection functions
  const testToken = () => {
    const token = localStorage.getItem('token');
    console.log('[TOKEN TEST] Current token in localStorage:', token);
    alert(`Current token in localStorage: ${token ? token : 'NULL'}`);
  };
  
  const setTestToken = () => {
    const testToken = 'test-token-for-debugging-' + new Date().getTime();
    localStorage.setItem('token', testToken);
    alert(`Set test token: ${testToken}`);
    console.log('[TOKEN TEST] Set test token:', testToken);
  };
  
  const reconnectWebSocket = () => {
    if (client) {
      client.deactivate();
      setClient(null);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      window.location.reload();
    }
  };
      
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