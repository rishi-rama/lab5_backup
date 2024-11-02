import { Request, Response } from 'express';
import { expenses } from './constants';
import { createExpenseEndpoints } from './expenses/expense-endpoints';
import { getBudget, updateBudget } from './budget/budget-utils';
import path from 'path';

const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Initial budget object
const budget = { amount: 1000 }; // Set an initial amount for the budget

// Root endpoint to test if the server is running
app.get('/api', (req: Request, res: Response) => {
  res.status(200).send({ data: "Hello, TypeScript Express!" });
});

// Expense-related endpoints
createExpenseEndpoints(app, expenses);

// Budget endpoints
app.get('/api/budget', (req: Request, res: Response) => getBudget(res, budget.amount));
app.put('/api/budget', (req: Request, res: Response) => updateBudget(res, req.body, budget));

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, '../../client/build')));

// Handles any requests that don’t match the defined API routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});