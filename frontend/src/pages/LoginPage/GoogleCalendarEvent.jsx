import React, { useEffect } from 'react';

export const LoginSignout = () => {
  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = '916755134531-fvnijil1m46cfuu84fgfm9uionutvr66.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyDEE9dMPEqB-GZG-JFpUWznyLXAcePptOc';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar openid email profile';

  const accessToken = localStorage.getItem('access_token');
  const expiresIn = localStorage.getItem('expires_in');

  let gapiInited = false,
    gisInited = false,
    tokenClient;

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, []);

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;

    // Set the token if already present in localStorage
    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: parseInt(expiresIn, 10), // Ensure `expires_in` is an integer
      });
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        if (response.error) {
          console.error('Error during authentication:', response);
          return;
        }

        const { access_token, expires_in } = gapi.client.getToken();
        console.log('Access Token:', access_token);

        // Store tokens in localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expires_in', expires_in);

        // Optionally, you can trigger any additional logic (like fetching events) here
      },
    });
    gisInited = true;
  }

  function handleAuthClick() {
    if (!accessToken || !expiresIn) {
      // Prompt user for authentication
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Request token without prompting
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token, () => {
        console.log('Access token revoked');
        gapi.client.setToken(null);
        localStorage.clear();
      });
    }
  }

  function addManualEvent() {
    const event = {
      kind: 'calendar#event',
      summary: 'Sample Event',
      location: 'Sample Location',
      description: 'Event Description',
      start: {
        dateTime: '2025-03-18T01:05:00.000Z',
        timeZone: 'UTC',
      },
      end: {
        dateTime: '2025-03-18T01:35:00.000Z',
        timeZone: 'UTC',
      },
      attendees: [{ email: 'sampleemail@gmail.com' }],
      reminders: {
        useDefault: true,
      },
    };

    gapi.client.calendar.events
      .insert({
        calendarId: 'primary',
        resource: event,
      })
      .then((response) => {
        console.log('Event created:', response);
        window.open(response.result.htmlLink);
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  }

  return (
    <div>
      <button
        id="authorize_button"
        hidden={!!(accessToken && expiresIn)}
        onClick={handleAuthClick}
      >
        Sign in with Google
      </button>
      <button
        id="signout_button"
        hidden={!accessToken || !expiresIn}
        onClick={handleSignoutClick}
      >
        Sign Out
      </button>
      <button
        id="add_manual_event"
        hidden={!accessToken || !expiresIn}
        onClick={addManualEvent}
      >
        Add Event
      </button>
      <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
    </div>
  );
};
