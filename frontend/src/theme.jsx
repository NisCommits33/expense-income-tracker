import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' for dark mode
    primary: {
      main: '#4361ee', // Modern blue
    },
    secondary: {
      main: '#3f37c9', // Deep blue
    },
    background: {
      default: '#f8f9fa', // Light gray background
      paper: '#ffffff', // White cards
    },
    text: {
      primary: '#212529', // Dark gray text
      secondary: '#6c757d', // Medium gray text
    },
    success: {
      main: '#19e070ff', // Teal
      contrastText: '#fff',
    },
    error: {
      main: '#f72525ff', // Pink
      contrastText: '#fff',
    },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

export default theme;