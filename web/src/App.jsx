import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EventContainer from './EventContainer';
import './style.css';

function getMostSevereAlert(events) {
  if (events.some((event) => event.severity === 'critical')) {
    return 'critical';
  }
  if (events.some((event) => event.severity === 'warning')) {
    return 'warning';
  }
  return 'ok';
}

function getBackgroundColor(events) {
  let background;
  switch (getMostSevereAlert(events)) {
    case 'none':
      background = '#747474';
      break;
    case 'ok':
      background = '#86C232';
      break;
    case 'warning':
      background = '#FF652F';
      break;
    case 'critical':
      background = '#FC4445';
      break;
    default:
      background = 'white';
  }
  return background;
}

function CouldNotFetch({ lastSuccessfulFetch }) {
  let lastFetch;
  if (lastSuccessfulFetch) {
    const temp_string = lastSuccessfulFetch.toString();
    lastFetch = temp_string.split(' ').splice(0, 5).join(' ');
  } else {
    lastFetch = 'none';
  }
  return (
    <>
      <p>Could not fetch data</p>
      <p>Last updated; {lastFetch}</p>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [lastSuccessfulFetch, setLastSuccessfulFetch] = useState(null);

  useEffect(() => {
    document.title = 'Aware monitoring';
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = 'white';
    };
  }, [backgroundColor]);

  useEffect(() => {
    function refetchData() {
      axios
        .get('/api/events')
        .then((response) => {
          setLoading(false);
          setError(null);
          setEvents(response.data);
          setBackgroundColor(getBackgroundColor(response.data));
          setLastSuccessfulFetch(new Date());
        })
        .catch((fetchError) => {
          setLoading(false);
          setError(fetchError);
        });
    }

    refetchData();
    const intervalId = window.setInterval(refetchData, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="Header">{window.location.host}</div>
      {error && <CouldNotFetch lastSuccessfulFetch={lastSuccessfulFetch} />}
      <EventContainer events={events} />
    </div>
  );
}
