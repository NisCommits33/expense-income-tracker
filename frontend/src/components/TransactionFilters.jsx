import React from 'react';
import { 
  Box, 
  TextField, 
  MenuItem, 
  InputAdornment,
  IconButton,
  Stack,
  useTheme,Paper
} from '@mui/material';
import { Search, FilterList, DateRange, Sort } from '@mui/icons-material';

const TransactionFilters = ({ 
  filters, 
  onFilterChange,
  categories 
}) => {
  const theme = useTheme();

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          size="small"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 2 }}
        />
        
        <TextField
          select
          size="small"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          sx={{ minWidth: 120 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterList fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
        
        <TextField
          select
          size="small"
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          sx={{ minWidth: 120 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Sort fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
          <MenuItem value="amount-high">Amount (High to Low)</MenuItem>
          <MenuItem value="amount-low">Amount (Low to High)</MenuItem>
        </TextField>
        
        <TextField
          type="date"
          size="small"
          value={filters.startDate}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRange fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          type="date"
          size="small"
          value={filters.endDate}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
        />
      </Stack>
    </Paper>
  );
};

export default TransactionFilters;