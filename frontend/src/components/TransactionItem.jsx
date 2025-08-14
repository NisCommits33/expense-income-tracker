// src/components/TransactionItem.jsx
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Stack,
  Chip,
  Avatar,
  useTheme
} from '@mui/material';
import { 
  Delete, 
  ArrowUpward, 
  ArrowDownward,
  DragHandle
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ItemTypes } from './ItemTypes';

const TransactionItem = ({ transaction, index, moveTransaction, onDelete }) => {
  const theme = useTheme();
  const ref = React.useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TRANSACTION,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TRANSACTION,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      moveTransaction(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      layout
    >
      <Card
        ref={ref}
        elevation={0}
        sx={{ 
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <DragHandle sx={{ color: theme.palette.action.active }} />
            
            <Avatar sx={{ 
              bgcolor: transaction.type === 'income' 
                ? theme.palette.success.light 
                : theme.palette.error.light,
              color: transaction.type === 'income' 
                ? theme.palette.success.contrastText 
                : theme.palette.error.contrastText,
              width: 32,
              height: 32
            }}>
              {transaction.type === 'income' ? (
                <ArrowUpward fontSize="small" />
              ) : (
                <ArrowDownward fontSize="small" />
              )}
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
              onClick={(e) => {
                e.stopPropagation();
                onDelete(transaction.id);
              }}
              size="small"
              sx={{ color: theme.palette.error.main }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionItem;