import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomAppBar from './AppBar';
import PlayerList from './PlayerList';
import Contact from './Contact';
import About from './About';
import Details from './Details';

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
    <Router>
      <div>
        <CustomAppBar />
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<PlayerList players={APIData} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/details" element={<Details players={APIData} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;