import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Box, Typography, Paper, useTheme } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const FinancialChart = ({ transactions }) => {
  const theme = useTheme();

  // Prepare data
  const incomeData = transactions.filter(t => t.type === 'income');
  const expenseData = transactions.filter(t => t.type === 'expense');

  // Category breakdown
  const expenseCategories = {};
  expenseData.forEach(t => {
    expenseCategories[t.category] = (expenseCategories[t.category] || 0) + t.amount;
  });

  // Monthly trends
  const monthlyData = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    monthlyData[month][t.type] += t.amount;
  });

  const doughnutData = {
    labels: Object.keys(expenseCategories),
    datasets: [{
      data: Object.values(expenseCategories),
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.error.main,
        theme.palette.warning.main,
        theme.palette.info.main,
      ],
      borderWidth: 0,
    }]
  };

  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyData).map(m => m.income),
        backgroundColor: theme.palette.success.main,
      },
      {
        label: 'Expenses',
        data: Object.values(monthlyData).map(m => m.expense),
        backgroundColor: theme.palette.error.main,
      }
    ]
  };

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Financial Overview</Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="subtitle2" gutterBottom>Expense Categories</Typography>
          <Doughnut data={doughnutData} />
        </Box>
        
        <Box sx={{ flex: 2, minWidth: 400 }}>
          <Typography variant="subtitle2" gutterBottom>Monthly Trends</Typography>
          <Bar data={barData} options={{
            responsive: true,
            scales: {
              x: { stacked: true },
              y: { stacked: false }
            }
          }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default FinancialChart;