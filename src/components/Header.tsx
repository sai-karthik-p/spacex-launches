import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SpacexLogo from '../assets/SpacexLogo';

function Header() {
  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <SpacexLogo />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;