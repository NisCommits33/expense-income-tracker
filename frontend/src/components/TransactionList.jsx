// src/components/TransactionList.jsx
// import React from 'react';
import { 
  Card, 
  Typography,
  Tabs,
  Tab,
  Box,
  useTheme
} from '@mui/material';
import { 
  AttachMoney,
  SortByAlpha
} from '@mui/icons-material';
import TransactionItem from './TransactionItem';
import React, { useState } from 'react';

const TransactionList = ({ 
  transactions, 
  onDelete,
  moveTransaction
}) => {
  const theme = useTheme();
  const [filter, setFilter] = useState('all');

  const handleTabChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

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
      
      {filteredTransactions.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          py: 4,
          color: 'text.secondary'
        }}>
          <AttachMoney sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
          <Typography>No transactions found</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filteredTransactions.map((transaction, index) => (
            <TransactionItem 
              key={transaction.id}
              transaction={transaction}
              index={index}
              onDelete={onDelete}
              moveTransaction={moveTransaction}
            />
          ))}
        </Box>
      )}
    </Card>
  );
};

export default TransactionList;