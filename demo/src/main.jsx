import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './auth/sign-in/index.jsx';
import Banner from './components/banner.jsx';
import Dashboard from './dashboard/index.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import DashboardLayout from './layout.jsx';
import Income from './components/_routes/income/income.jsx';
import Budgets from './components/_routes/budgets/budgets.jsx';
import Upgrade from './components/_routes/upgrade.jsx';
import Expenses from './components/_routes/expenses/expenses.jsx';
import Latest_Expenses from './components/_routes/expenses/_components/Latest_Expenses';
import ExpenseList from './components/_routes/expenses/_components/ExpenseList';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Banner/>,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
          {
            path: 'expenses',
            element: <Latest_Expenses/>,
          },
          {
            path: 'expenses/:budget_id',
            element: <Expenses/>,
          },
          {
            path: 'incomes',
            element: <Income/>,
            // children:[{
            //   path: ':id_',
            //   element: <Income />,
            // }]
          },
          {
            path: 'budgets',
            element: <Budgets />,
          },
          {
            path: 'upgrade',
            element: <Upgrade />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth/sign-in',
    element: <SignIn />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
