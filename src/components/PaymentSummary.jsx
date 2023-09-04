import React from "react";
import "../styles/PaymentSummary.css";
import { useSelector } from "react-redux";

function PaymentSummary({ onConfirmPayment, onClose }) {
  const { paymentData, invoiceNumber, receiptVoucher, cart } = useSelector(
    (state) => state.clientProgress
  );

  return (
    <div className='payment-summary-backdrop'>
      <div className='payment-summary'>
        <h2>Payment Summary</h2>
        <div className='invoice-info'>
          <p>Card Number: {paymentData.number}</p>
          <p>Name: {paymentData.name}</p>
          <p>Expire Date: {paymentData.expiry}</p>
          <p>CVV: {paymentData.cvv}</p>
        </div>
        <hr />
        <div className='invoice-details'>
          <p>Invoice Number: {invoiceNumber}</p>
          <p>Receipt Voucher: {receiptVoucher}</p>
        </div>
        <hr />
        <div className='cart-details'>
          <h3>Order Details:</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - Price: ${item.price}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onConfirmPayment}>Confirm</button>
        <button onClick={onClose} className='close-button'>
          x
        </button>
      </div>
    </div>
  );
}

export default PaymentSummary;
