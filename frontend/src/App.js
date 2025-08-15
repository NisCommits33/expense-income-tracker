import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createAppTheme } from './theme';
import AppHeader from './components/AppHeader';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FinancialChart from './components/FinancialChart';
import TransactionFilters from './components/TransactionFilters';
import BalanceDisplay from './components/BalanceDisplay';

// Memoize categories to prevent recreation
const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other']
};

// Optimized filter functions
const filterBySearch = (transactions, search) => {
  if (!search) return transactions;
  const term = search.toLowerCase();
  return transactions.filter(t => 
    t.description.toLowerCase().includes(term) ||
    t.category.toLowerCase().includes(term)
  );
};

const filterByType = (transactions, type) => {
  return type === 'all' ? transactions : transactions.filter(t => t.type === type);
};

const sortTransactions = (transactions, sortMethod) => {
  const copy = [...transactions];
  switch (sortMethod) {
    case 'newest': return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'oldest': return copy.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'amount-high': return copy.sort((a, b) => b.amount - a.amount);
    case 'amount-low': return copy.sort((a, b) => a.amount - b.amount);
    default: return copy;
  }
};

function App() {
  // State initialization with lazy initial state
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );

  const [transactions, setTransactions] = useState(() => {
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

  // Memoized theme
  const theme = useMemo(() => createAppTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  // Debounced localStorage save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('darkMode', darkMode);
    }, 500);
    return () => clearTimeout(timer);
  }, [transactions, darkMode]);

  // Optimized transaction processing pipeline
  const filteredTransactions = useMemo(() => {
    let result = transactions;
    
    // Apply filters in optimal order (most selective first)
    result = filterByType(result, filters.type);
    result = filterBySearch(result, filters.search);
    
    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }
    
    if (filters.startDate) {
      const start = new Date(filters.startDate);
      result = result.filter(t => new Date(t.date) >= start);
    }
    
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      result = result.filter(t => new Date(t.date) <= end);
    }
    
    return sortTransactions(result, filters.sort);
  }, [transactions, filters]);

  // Memoized handler functions
  const addTransaction = useCallback((transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const moveTransaction = useCallback((dragIndex, hoverIndex) => {
    setTransactions(prev => {
      const newItems = [...prev];
      const [removed] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, removed);
      return newItems;
    });
  }, []);

  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

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
            {/* Left Column */}
            <MemoizedLeftColumn 
              transactions={transactions}
              addTransaction={addTransaction}
            />
            
            {/* Right Column */}
            <MemoizedRightColumn
              transactions={transactions}
              filteredTransactions={filteredTransactions}
              filters={filters}
              handleFilterChange={handleFilterChange}
              deleteTransaction={deleteTransaction}
              moveTransaction={moveTransaction}
            />
          </Box>
        </Container>
      </DndProvider>
    </ThemeProvider>
  );
}

// Optimized sub-components
const MemoizedLeftColumn = React.memo(({ transactions, addTransaction }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <BalanceDisplay transactions={transactions} />
    <TransactionForm onSubmit={addTransaction} categories={CATEGORIES} />
  </Box>
));

const MemoizedRightColumn = React.memo(({
  transactions,
  filteredTransactions,
  filters,
  handleFilterChange,
  deleteTransaction,
  moveTransaction
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <FinancialChart transactions={transactions} />
    <TransactionFilters
      filters={filters}
      onFilterChange={handleFilterChange}
      categories={Object.keys(CATEGORIES).flatMap(type => CATEGORIES[type])}
    />
    <TransactionList 
      transactions={filteredTransactions} 
      onDelete={deleteTransaction}
      moveTransaction={moveTransaction}
    />
  </Box>
));

export default React.memo(App);