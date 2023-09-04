// src/Routes.js
import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import App from "./App";
import PaymentResult from "./pages/PaymentResult";

function Routes() {
  return (
    <RouterRoutes>
      <Route path='/' element={<App />} />
      <Route path='/payment-result' element={<PaymentResult />} />
    </RouterRoutes>
  );
}

export default Routes;
