import React, { useState } from 'react';
import AddPlayerForm from './AddPlayerForm';
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
  CardMedia
} from '@mui/material';

function PlayerList({ players }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleClose = () => {
    setSelectedPlayer(null);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1">Player List</Typography>
      {players.map((data) => (
        <Card key={data.id} sx={{ marginBottom: '16px' }}>
          <CardMedia component="img" height="140" image={data.img} alt={data.name} />
          <CardContent>
            <Typography variant="h6" component="h2">{data.name}</Typography>
            <Typography variant="body1">Club: {data.club}</Typography>
            <Typography variant="body1">Nation: {data.nation}</Typography>
            <Typography variant="body1">Cost: {data.cost}</Typography>
            <Button onClick={() => handlePlayerClick(data)} variant="contained" color="primary">
              Show Info
            </Button>
          </CardContent>
        </Card>
      ))}
      <AddPlayerForm />

      <Dialog open={selectedPlayer !== null} onClose={handleClose}>
        <DialogTitle>{selectedPlayer?.name}</DialogTitle>
        <DialogContent>
          <Box>
            <iframe
              width="100%"
              height="auto"
              src={selectedPlayer?.clip}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
          <DialogContentText>
            <Typography variant="body1">Club: {selectedPlayer?.club}</Typography>
            <Typography variant="body1">Nation: {selectedPlayer?.nation}</Typography>
            <Typography variant="body1">Cost: {selectedPlayer?.cost}</Typography>
            <Typography variant="body1">Famous: {selectedPlayer?.famous ? 'Yes' : 'No'}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PlayerList;