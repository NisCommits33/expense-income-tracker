import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Button,
  useTheme
} from '@mui/material';
import { 
  AccountBalanceWallet, 
  Brightness4, 
  Brightness7,
  Add
} from '@mui/icons-material';

const AppHeader = ({ darkMode, toggleDarkMode, onAddTransaction }) => {
  const theme = useTheme();
  
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <AccountBalanceWallet sx={{ 
          mr: 2, 
          color: theme.palette.primary.main,
          fontSize: 32
        }} />
        
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        
        <Button 
          color="inherit" 
          startIcon={<Add />}
          onClick={onAddTransaction}
          sx={{ mr: 2 }}
        >
          Add Transaction
        </Button>
        
        <IconButton 
          onClick={toggleDarkMode} 
          color="inherit"
          aria-label={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;