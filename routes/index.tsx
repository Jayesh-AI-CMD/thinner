import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../src/pages/AdminDashboard';
import NotFound from '../src/pages/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define the /admin route */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Add a fallback route for 404 errors */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;