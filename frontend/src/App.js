import React, { useState } from 'react';
import { 
  Container, 
  CssBaseline, 
  Box, 
  styled,
  useTheme
} from '@mui/material';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BalanceDisplay from './components/BalanceDisplay';
import AppHeader from './components/AppHeader';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const theme = useTheme();

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <>
      <CssBaseline />
      <AppHeader />
      <StyledContainer maxWidth="md">
        <Box sx={{ 
          display: 'grid', 
          gap: theme.spacing(4),
          gridTemplateColumns: { md: '1fr 1.5fr' },
          alignItems: 'start'
        }}>
          <Box>
            <BalanceDisplay transactions={transactions} />
            <TransactionForm onSubmit={addTransaction} />
          </Box>
          <TransactionList 
            transactions={filteredTransactions} 
            onDelete={deleteTransaction}
            filter={filter}
            setFilter={setFilter}
          />
        </Box>
      </StyledContainer>
    </>
  );
}

export default App;