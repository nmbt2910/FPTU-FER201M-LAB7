import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Link } from 'react-router-dom';

function CustomAppBar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobileScreen = useMediaQuery('(max-width: 600px)');

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const drawerItems = [
    { text: 'Dashboard', link: '/', color: '#ff0000' },
    { text: 'About', link: '/about', color: '#00ff00' },
    { text: 'Contact', link: '/contact', color: '#0000ff' },
    { text: 'Details', link: '/details', color: '#ffff00' },
  ];

  const renderNavigation = () => {
    if (isMobileScreen) {
      return (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} variant="persistent">
          <List sx={{ width: 240 }}>
            {drawerItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.link} onClick={toggleDrawer}>
                <ListItemText primary={item.text} primaryTypographyProps={{ style: { color: '#000', fontWeight: 'bold' } }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      );
    } else {
      return (
        <React.Fragment>
          {drawerItems.map((item, index) => (
            <Button key={index} component={Link} to={item.link} sx={{ fontWeight: 'bold', color: '#fff' }}>
              {item.text}
            </Button>
          ))}
        </React.Fragment>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobileScreen ? (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <SportsSoccerIcon sx={{ marginRight: '8px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SoccerSphere
        </Typography>
        {renderNavigation()}
      </Toolbar>
      {isDrawerOpen && isMobileScreen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={toggleDrawer}
        />
      )}
    </AppBar>
  );
}

export default CustomAppBar;