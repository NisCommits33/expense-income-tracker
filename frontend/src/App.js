// src/App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ThemeProvider, 
  CssBaseline,
  Container,
  Box
} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createAppTheme } from './theme';
import AppHeader from './components/AppHeader';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FinancialChart from './components/FinancialChart';
import TransactionFilters from './components/TransactionFilters';
import BalanceDisplay from './components/BalanceDisplay';

// Sample categories
const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other']
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference
    return localStorage.getItem('darkMode') === 'true';
  });
  const [transactions, setTransactions] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    type: 'all',
    sort: 'newest',
    startDate: '',
    endDate: ''
  });

  // Create theme
  const theme = useMemo(() => createAppTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [darkMode, transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    
    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(searchTerm) ||
        t.category.toLowerCase().includes(searchTerm)
   ) }
    
    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }
    
    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }
    
    if (filters.startDate) {
      result = result.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }
    
    if (filters.endDate) {
      result = result.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'newest':
        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return result.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'amount-high':
        return result.sort((a, b) => b.amount - a.amount);
      case 'amount-low':
        return result.sort((a, b) => a.amount - b.amount);
      default:
        return result;
    }
  }, [transactions, filters]);

  // Handler functions
  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const moveTransaction = (dragIndex, hoverIndex) => {
    setTransactions(prev => {
      const newTransactions = [...prev];
      const [removed] = newTransactions.splice(dragIndex, 1);
      newTransactions.splice(hoverIndex, 0, removed);
      return newTransactions;
    });
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <AppHeader 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ 
            display: 'grid',
            gap: 4,
            gridTemplateColumns: { md: '1fr 1.5fr' },
            alignItems: 'start'
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <BalanceDisplay transactions={transactions} />
              <TransactionForm 
                onSubmit={addTransaction} 
                categories={categories} 
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <FinancialChart transactions={transactions} />
              
              <TransactionFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={Object.keys(categories).reduce((acc, type) => {
                  return [...acc, ...categories[type]];
                }, [])}
              />
              
              <TransactionList 
                transactions={filteredTransactions} 
                onDelete={deleteTransaction}
                moveTransaction={moveTransaction}
              />
            </Box>
          </Box>
        </Container>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;