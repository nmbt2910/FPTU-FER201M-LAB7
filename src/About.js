import React from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';

function About() {
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
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '32px' }}>
          <Typography variant="h4" component="h1" sx={{ marginBottom: '16px' }}>
            About Page
          </Typography>
          <Typography variant="body1">
            This is the About page of your application. You can add your own content here to describe your application
            or provide additional information to your users.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default About;