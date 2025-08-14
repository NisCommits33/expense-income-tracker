import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Box,
  useTheme
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const BalanceDisplay = ({ transactions }) => {
  const theme = useTheme();
  
  const balance = transactions.reduce((total, t) => {
    return t.type === 'income' ? total + t.amount : total - t.amount;
  }, 0);

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          CURRENT BALANCE
        </Typography>
        <Typography 
          variant="h3" 
          fontWeight={700}
          color={balance >= 0 ? 'success.main' : 'error.main'}
          sx={{ mb: 3 }}
        >
          ${balance.toFixed(2)}
        </Typography>
        
        <Stack direction="row" spacing={3}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingUp color="success" />
              <Typography variant="subtitle2" color="text.secondary">
                Income
              </Typography>
            </Stack>
            <Typography variant="h6" color="success.main" fontWeight={600}>
              +${income.toFixed(2)}
            </Typography>
          </Box>
          
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingDown color="error" />
              <Typography variant="subtitle2" color="text.secondary">
                Expenses
              </Typography>
            </Stack>
            <Typography variant="h6" color="error.main" fontWeight={600}>
              -${expense.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BalanceDisplay;