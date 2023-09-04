import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/PaymentResult.css";
function PaymentResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionResult = searchParams.get("message");

  return (
    <div className='payment-result'>
      <h2>Resultado de la Transacción</h2>
      <p>{transactionResult}</p>
      <Link to='/'>Volver a comprar</Link>
    </div>
  );
}

export default PaymentResult;
