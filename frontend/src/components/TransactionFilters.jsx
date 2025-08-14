import React from 'react';
import { 
  Box, 
  TextField, 
  MenuItem, 
  InputAdornment,
  Stack,
  useTheme,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  DateRange, 
  Sort,
  Clear
} from '@mui/icons-material';

const TransactionFilters = ({ 
  filters = {}, 
  onFilterChange = () => {},
  categories = [] 
}) => {
  const theme = useTheme();

  // Default filter values
  const defaultFilters = {
    search: '',
    category: 'all',
    sort: 'newest',
    startDate: '',
    endDate: ''
  };

  // Merge provided filters with defaults
  const currentFilters = { ...defaultFilters, ...filters };

  const handleClearFilters = () => {
    onFilterChange('clear', null); // Special case for clearing all
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <Stack 
        direction="row" 
        spacing={2} 
        // alignItems="center"
        sx={{
          flexWrap: 'wrap',
          rowGap:2,
          '& > *': { flex: '1 1 200px' } // Responsive behavior
        }}
      >
        {/* Search Field */}
        <TextField
          size="small"
          placeholder="Search transactions..."
          value={currentFilters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        {/* Category Filter */}
        <TextField
          select
          size="small"
          value={currentFilters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
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
        
        {/* Sort Field */}
        <TextField
          select
          size="small"
          value={currentFilters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
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
        
        {/* Date Range Fields */}
        <TextField
          type="date"
          size="small"
          value={currentFilters.startDate}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
          label="From"
          InputLabelProps={{ shrink: true }}
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
          value={currentFilters.endDate}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
          label="To"
          InputLabelProps={{ shrink: true }}
        />

        {/* Clear Filters Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title="Clear all filters">
            <IconButton 
              onClick={handleClearFilters}
              disabled={Object.keys(filters).length === 0}
              sx={{
                visibility: Object.keys(filters).length > 0 ? 'visible' : 'hidden'
              }}
            >
              <Clear />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Paper>
  );
};

export default TransactionFilters;