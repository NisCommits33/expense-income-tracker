import React, { useState } from "react";
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
  useTheme,
} from "@mui/material";
import {
  AddCircleOutline,
  Paid,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material";

const categories = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: [
    "Food",
    "Transport",
    "Housing",
    "Entertainment",
    "Utilities",
    "Other",
  ],
};

const StyledTextField = ({ icon, borderColor, ...props }) => {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      InputProps={{
        startAdornment: React.cloneElement(icon, {
          sx: {
            color: theme.palette.text.secondary,
            mr: 1,
          },
        }),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "& fieldset": {
            borderColor: borderColor || "default",
          },
          "&:hover fieldset": {
            borderColor: borderColor || "default",
          },
        },
      }}
      {...props}
    />
  );
};

function TransactionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const theme = useTheme();
  // Track validation errors
  const [errors, setErrors] = useState({
    amount: "",
    date: "",
  });

  // Validate a field in real-time
  const validateField = (name, value) => {
    switch (name) {
      case "amount":
        if (!value) return "Amount is required";
        if (isNaN(value)) return "Must be a number";
        if (parseFloat(value) <= 0) return "Must be positive";
        if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Max 2 decimal places";
        return "";
      case "date":
        if (!value) return "Date is required";
        if (new Date(value) > new Date()) return "Cannot be in the future";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Auto-reset category if type changes
      if (name === "type") {
        newData.category = categories[value][0];
      }
      return newData;
    });

    // Validate the field
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submit
    const finalErrors = {
      amount: validateField("amount", formData.amount),
      date: validateField("date", formData.date),
    };
    setErrors(finalErrors);

    // Only submit if no errors
    if (!finalErrors.amount && !finalErrors.date) {
      const transaction = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString(),
      };
      onSubmit(transaction);
      setFormData((prev) => ({
        description: "",
        amount: "",
        type: prev.type,
        category: categories[prev.type][0],
        date: new Date().toISOString().split("T")[0],
      }));
    }
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
              error={!!errors.amount}
              helperText={errors.amount}
              borderColor={
                formData.type === "income" ? "success.main" : "error.main"
              }
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
              error={!!errors.date}
              helperText={errors.date}
            />

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Type"
                  onChange={handleChange}
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        formData.type === "income"
                          ? "success.main"
                          : "error.main",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        formData.type === "income"
                          ? "success.main"
                          : "error.main",
                    },
                  }}
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
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        formData.type === "income"
                          ? "success.main"
                          : "error.main",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        formData.type === "income"
                          ? "success.main"
                          : "error.main",
                    },
                  }}
                >
                  {categories[formData.type].map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
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
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
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
