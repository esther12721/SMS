import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "reports", element: <Reports /> },
    ],
  },

  { path: "/login", element: <Login /> },
]);

export default router;