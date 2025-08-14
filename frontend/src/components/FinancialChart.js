import React, { useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Box, Typography, Paper, Tabs, Tab, useTheme } from '@mui/material';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, 
  LineElement, Title
);

const FinancialChart = ({ transactions }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // Prepare monthly data for bar chart
  const monthlyData = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    monthlyData[month][t.type] += t.amount;
  });

  // Bar chart data
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

  // Doughnut chart data (expense categories)
  const expenseCategories = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expenseCategories[t.category] = (expenseCategories[t.category] || 0) + t.amount;
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

  // Line chart data (cumulative balance over time)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;
  const lineData = {
    labels: sortedTransactions.map(t => 
      new Date(t.date).toLocaleDateString('default', { month: 'short', day: 'numeric' })
    ),
    datasets: [{
      label: 'Balance Over Time',
      data: sortedTransactions.map(t => {
        runningBalance += t.type === 'income' ? t.amount : -t.amount;
        return runningBalance;
      }),
      borderColor: theme.palette.primary.main,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      tension: 0.1,
      fill: true
    }]
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={0} sx={{ p: 2, height: '100%' }}>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Monthly Trends" />
        <Tab label="Spending Breakdown" />
        <Tab label="Balance History" />
      </Tabs>
      
      {tabValue === 0 && (
        <Box sx={{ height: 300 }}>
          <Bar 
            data={barData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Monthly Trends' }
              },
              scales: {
                x: { stacked: true },
                y: { stacked: false }
              }
            }} 
          />
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box sx={{ height: 300 }}>
          <Doughnut 
            data={doughnutData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'right' }
              }
            }}
          />
        </Box>
      )}
      
      {tabValue === 2 && (
        <Box sx={{ height: 300 }}>
          <Line 
            data={lineData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' }
              },
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default FinancialChart;