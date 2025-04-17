import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import CustomersPage from "./pages/admin/CustomersPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/customers" element={<CustomersPage />} />
        {/* ...other routes... */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
