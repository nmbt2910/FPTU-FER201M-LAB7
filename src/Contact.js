import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
} from '@mui/material';

function Contact() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        marginTop: '-100px',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
            Contact Us
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Contact;