import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Stack,
  Card,
  CardContent,
  Typography,
  useTheme
} from '@mui/material';
import { AddCircleOutline, Category, Paid, CalendarToday, AttachMoney } from '@mui/icons-material';

const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other']
};

const StyledTextField = ({ icon, ...props }) => {
  const theme = useTheme();
  
  return (
    <TextField
      fullWidth
      InputProps={{
        startAdornment: React.cloneElement(icon, { 
          sx: { 
            color: theme.palette.text.secondary,
            mr: 1
          } 
        }),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        }
      }}
      {...props}
    />
  );
};

function TransactionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'type') {
        return {
          ...prev,
          [name]: value,
          category: categories[value][0]
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString()
    };
    onSubmit(transaction);
    setFormData(prev => ({
      description: '',
      amount: '',
      type: prev.type,
      category: categories[prev.type][0],
      date: new Date().toISOString().split('T')[0]
    }));
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Add New Transaction
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <StyledTextField
              icon={<Paid />}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            
            <StyledTextField
              icon={<AttachMoney />}
              label="Amount"
              name="amount"
              type="number"
              inputProps={{ step: "0.01" }}
              value={formData.amount}
              onChange={handleChange}
              required
            />
            
            <StyledTextField
              icon={<CalendarToday />}
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              required
            />
            
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Type"
                  onChange={handleChange}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                  sx={{ borderRadius: 2 }}
                >
                  {categories[formData.type].map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={<AddCircleOutline />}
              size="large"
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                }
              }}
            >
              Add Transaction
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default TransactionForm;