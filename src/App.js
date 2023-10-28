import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList';
import { Container } from '@mui/material';

function App() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    const baseURL = 'https://6535dff3c620ba9358ecb96d.mockapi.io/dbPlayers';

    fetch(baseURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setAPIData(data);
      })
      .catch(error => console.log(error.message));
  }, []);

  return (
    <Container maxWidth="sm">
      <PlayerList players={APIData} />
    </Container>
  );
}

export default App;