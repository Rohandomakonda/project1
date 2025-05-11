import React, { useState, useEffect } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const LoginSignout = (props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const initializeGapi = async () => {
      try {
        await window.gapi.client.init({
          apiKey: `${process.env.API_KEY}`,
          discoveryDocs: [`${process.env.DISCOVERY_DOC}`],
        });

        // Initialize the tokenClient
        
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: `${process.env.CLIENT_ID}`,
          scope: `${process.env.SCOPES}`,
          callback: handleTokenResponse,
        });
        setTokenClient(client);

        // Check for existing valid token
        const storedToken = localStorage.getItem('access_token');
        const expiresAt = localStorage.getItem('expires_at');
        if (storedToken && expiresAt && new Date().getTime() < parseInt(expiresAt, 10)) {
          window.gapi.client.setToken({
            access_token: storedToken,
          });
          setIsLoggedIn(true);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing GAPI client:', error);
      }
    };

    // Initialize GAPI client
    window.gapi.load('client', initializeGapi);
  }, []);

  const handleTokenResponse = (response) => {
    if (response.error) {
      console.error('Error during authentication:', response);
      return;
    }

    const { access_token } = window.gapi.client.getToken();
    const expiresAt = new Date().getTime() + 3600 * 1000; // Token expires in 1 hour

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('expires_at', expiresAt.toString());
    setIsLoggedIn(true);
  };

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (!tokenClient) {
      console.error('Token client not initialized');
      return;
    }

    if (!isLoggedIn) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } 

    addManualEvent();
    
  };

  const handleSignoutClick = async () => {
    const token = window.gapi.client.getToken();
    if (token) {
      try {
        await window.google.accounts.oauth2.revoke(token.access_token);
        window.gapi.client.setToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        setIsLoggedIn(false);
      } catch (error) {
        console.error('Error revoking token:', error);
      }
    }
  };

  const addManualEvent = async () => {
    const event = {
      kind: "calendar#event",
      summary: `${props.title}`,
      location: `${props.venue}`,
      description: `${props.description}`,
      start: {
        dateTime: `${props.date}T${props.time}:00.000Z`,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: `${props.date}T${props.time}:00.000Z`,
        timeZone: "Asia/Kolkata",
      },
      attendees: [{ email: "sampleemail@gmail.com" }],
      reminders: {
        useDefault: true,
      },
    };

    try {
      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      console.log('Event created:', response);
      window.open(response.result.htmlLink);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleAuthClick}
        disabled={!isInitialized}
      >
        {/* {isLoggedIn ? 'Add Event' : 'Sign In'} */}
        <CalendarTodayIcon/>  
      </button>
    </div>
  );
};

export default LoginSignout;