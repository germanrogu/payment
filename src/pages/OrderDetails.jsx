import React from "react";
import "../styles/OrderDetails.css";
import Product from "../components/Product";
import { useSelector } from "react-redux";

export default function OrderDetails({ openModal, products }) {
  const { receiptVoucher, invoiceNumber } = useSelector(
    (state) => state.clientProgress
  );

  return (
    <section className='order-details'>
      <div className='order-details-header'>
        <p className='order-greeting'>
          Thanks for your Order, <span className='order-name'>German</span>!
        </p>
      </div>
      <div className='order-details-body'>
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

      <div className='order-summary'>
        <p className='order-summary-title'>Order Details</p>
        <p className='order-total'>
          Total <span className='order-total-amount'>$32.2</span>
        </p>
      </div>
      <div className='order-summary'>
        <p className='order-summary-title'>Invoice Number</p>
        <p className='order-invoice'>Invoice Number: {invoiceNumber}</p>
      </div>
      <div className='order-summary'>
        <p className='order-summary-title'>Receipt Voucher</p>
        <p className='order-invoice'>Receipt Voucher: {receiptVoucher}</p>
      </div>
      <div className='order-total-paid'>
        Total Paid: <span className='order-amount'>$32.2</span>
      </div>
      <div className='order-button'>
        <button onClick={openModal}>Pay with Credit Card</button>
      </div>
    </section>
  );
}
