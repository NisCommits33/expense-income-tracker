import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  useTheme
} from '@mui/material';
import { AccountBalanceWallet, Brightness4, Brightness7 } from '@mui/icons-material';

const AppHeader = ({ toggleTheme, darkMode }) => {
  const theme = useTheme();
  
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        mb: 4
      }}
    >
      <Toolbar>
        <AccountBalanceWallet sx={{ mr: 2, color: theme.palette.primary.main }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;