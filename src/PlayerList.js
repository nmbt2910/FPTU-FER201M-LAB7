import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardMedia,
  TextField,
} from '@mui/material';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayerData, setNewPlayerData] = useState({
    name: '',
    club: '',
    nation: '',
    cost: '',
    img: '',
    clip: '',
    info: '',
  });
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlayerData, setEditedPlayerData] = useState({
    name: '',
    club: '',
    nation: '',
    cost: '',
    img: '',
    clip: '',
    info: '',
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        'https://6535dff3c620ba9358ecb96d.mockapi.io/dbPlayers'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };



  const handleAddPlayer = () => {
    setIsAddingPlayer(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://6535dff3c620ba9358ecb96d.mockapi.io/dbPlayers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayerData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to add player');
      }
      setIsAddingPlayer(false);
      setNewPlayerData({
        name: '',
        club: '',
        nation: '',
        cost: '',
        img: '',
        clip: '',
        info: '',
      });
      fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    try {
      const response = await fetch(
        `https://6535dff3c620ba9358ecb96d.mockapi.io/dbPlayers/${playerId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete player');
      }
      fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPlayer = (player) => {
    setEditedPlayerData({
      name: player.name,
      club: player.club,
      nation: player.nation,
      cost: player.cost,
      img: player.img,
      clip: player.clip,
      info: player.info,
    });
    setIsEditing(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdatePlayer = async () => {
    try {
      const response = await fetch(
        `https://6535dff3c620ba9358ecb96d.mockapi.io/dbPlayers/${selectedPlayer.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedPlayerData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update player');
      }
      setIsEditing(false);
      setEditedPlayerData({
        name: '',
        club: '',
        nation: '',
        cost: '',
        img: '',
        clip: '',
        info: '',
      });
      fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Button
        onClick={handleAddPlayer}
        variant="contained"
        color="primary"
        sx={{ marginBottom: '16px' }}
      >
        Add New Player
         </Button>
      {players.map((player) => (
        <Card
          key={player.id}
          sx={{ marginBottom: '16px' }}
          onClick={() => handlePlayerClick(player)}
        >
          <CardMedia
            component="img"
            height="140"
            image={player.img}
            alt={player.name}
          />
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 'bold', fontSize: '20px' }}
            >
              {player.name}
            </Typography>
            <Typography variant="body1">Club: {player.club}</Typography>
            <Typography variant="body1">Nation: {player.nation}</Typography>
            <Typography variant="body1">Cost: {player.cost}</Typography>
            <Box sx={{ marginTop: '10px' }}>
              <Button
                onClick={() => handleDeletePlayer(player.id)}
                variant="contained"
                color="error"
              >
                Delete Player
              </Button>
              <Button
                onClick={() => handleEditPlayer(player)}
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
              >
                Edit Player
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
     
      <Dialog
        open={isAddingPlayer}
        onClose={() => setIsAddingPlayer(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the information for the new player:
          </DialogContentText>
          <Box sx={{ display: 'grid', gap: '16px' }}>
            <TextField
              name="name"
              label="Name"
              value={newPlayerData.name}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              name="club"
              label="Club"
              value={newPlayerData.club}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              name="nation"
              label="Nation"
              value={newPlayerData.nation}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              name="cost"
              label="Cost"
              value={newPlayerData.cost}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              name="img"
              label="Image URL"
              value={newPlayerData.img}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              name="clip"
              label="YouTube Clip URL"
              value={newPlayerData.clip}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              name="info"
              label="Player Information"
              value={newPlayerData.info}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the information for the selected player:
          </DialogContentText>
          <Box sx={{ display: 'grid', gap: '16px' }}>
            <TextField
              name="name"
              label="Name"
              value={editedPlayerData.name}
              onChange={handleEditInputChange}
              variant="outlined"
            />
            <TextField
              name="club"
              label="Club"
              value={editedPlayerData.club}
              onChange={handleEditInputChange}
              variant="outlined"
            />
            <TextField
              name="nation"
              label="Nation"
              value={editedPlayerData.nation}
              onChange={handleEditInputChange}
              variant="outlined"
            />
            <TextField
              name="cost"
              label="Cost"
              value={editedPlayerData.cost}
              onChange={handleEditInputChange}
              variant="outlined"
            />
            <TextField
              name="img"
              label="Image URL"
              value={editedPlayerData.img}
              onChange={handleEditInputChange}
              variant="outlined"
            />
            <TextField
              name="clip"
              label="YouTube Clip URL"
              value={editedPlayerData.clip}
              onChange={handleEditInputChange}
              variant="outlined"
            />
            <TextField
              name="info"
              label="Player Information"
              value={editedPlayerData.info}
              onChange={handleEditInputChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleUpdatePlayer}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlayerList;