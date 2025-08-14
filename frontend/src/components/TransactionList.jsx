import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Stack,
  Chip,
  Tabs,
  Tab,
  Divider,
  Avatar,
  useTheme, Box
} from '@mui/material';
import { 
  Delete, 
  ArrowUpward, 
  ArrowDownward,
  AttachMoney
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const TransactionItem = ({ transaction, onDelete }) => {
  const theme = useTheme();
  
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      layout
      sx={{ mb: 2 }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ 
            bgcolor: transaction.type === 'income' 
              ? theme.palette.success.light 
              : theme.palette.error.light,
            color: transaction.type === 'income' 
              ? theme.palette.success.contrastText 
              : theme.palette.error.contrastText
          }}>
            {transaction.type === 'income' ? <ArrowUpward /> : <ArrowDownward />}
          </Avatar>
          <Stack sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              {transaction.description}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip 
                label={transaction.category} 
                size="small" 
                sx={{ 
                  borderRadius: 1,
                  bgcolor: theme.palette.action.selected,
                  color: theme.palette.text.secondary
                }} 
              />
              <Typography variant="caption" color="text.secondary">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </Typography>
            </Stack>
          </Stack>
          <Typography 
            variant="subtitle1" 
            fontWeight={600}
            color={transaction.type === 'income' ? 'success.main' : 'error.main'}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {transaction.amount.toFixed(2)}
          </Typography>
          <IconButton 
            onClick={() => onDelete(transaction.id)}
            size="small"
            sx={{ color: theme.palette.error.main }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </MotionCard>
  );
};

const TransactionList = ({ transactions, onDelete, filter, setFilter }) => {
  const handleTabChange = (event, newValue) => {
    setFilter(newValue);
  };

  return (
    <Card elevation={0} sx={{ p: 2 }}>
      <Tabs
        value={filter}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Income" value="income" />
        <Tab label="Expenses" value="expense" />
      </Tabs>
      
      {transactions.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          py: 4,
          color: 'text.secondary'
        }}>
          <AttachMoney sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
          <Typography>No transactions yet</Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {transactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </Stack>
      )}
    </Card>
  );
};

export default TransactionList;