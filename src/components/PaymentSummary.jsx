import React from "react";
import "../styles/PaymentSummary.css";
function PaymentSummary({ paymentInfo, onConfirmPayment }) {
  return (
    <div className='payment-summary'>
      <h2>Resumen del Pago</h2>
      <p>Número de tarjeta: {paymentInfo.number}</p>
      <p>Nombre del titular: {paymentInfo.name}</p>
      <p>Fecha de expiración: {paymentInfo.expiry}</p>
      <p>CVC: {paymentInfo.cvc}</p>
      <button onClick={onConfirmPayment}>Confirmar Pago</button>
    </div>
  );
}

export default PaymentSummary;
