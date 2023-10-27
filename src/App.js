import React, { useEffect, useState } from 'react';
import AddPlayerForm from './AddPlayerForm';
import './App.css';

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
    <div className="App">
      <h1>Player List</h1>
      {APIData.map((data) => {
        return (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <p>Club: {data.club}</p>
            <p>Nation: {data.nation}</p>
            <p>Cost: {data.cost}</p>
            <img src={data.img} alt={data.name} /> {/* Display the image */}
            <iframe src={data.clip} title={data.name} allowFullScreen /> {/* Display the video */}
            <p>Famous: {data.famous ? 'Yes' : 'No'}</p>
            <p>Info: {data.info}</p>
            <hr />
          </div>
        );
      })}
      <AddPlayerForm />
    </div>
  );
}

export default App;