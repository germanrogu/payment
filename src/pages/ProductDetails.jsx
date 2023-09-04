import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreditCardModal from "../components/CreditCardModal";
import PaymentSummary from "../components/PaymentSummary";
import Notification from "../components/common/Notification";
import { products } from "../constants/Products";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePayment = () => {
    setShowPaymentSummary(true);
  };

  const paymentData = useSelector((state) => state.clientProgress);

  const confirmPayment = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      dispatch({ type: "CONFIRM_PAYMENT", payload: paymentData });
      setShowPaymentSummary(false);
    } catch (error) {
      setShowPaymentSummary(false);
      setPaymentError(error.message);
    }
  };

  useEffect(() => {
    if (paymentData.confirmationSuccess) {
      navigate("/payment-result?message=Successful payment");
    }
  }, [navigate, paymentData.confirmationSuccess]);

  return (
    <>
      {paymentData.loading && (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      )}
      <OrderDetails
        openModal={() => setIsModalOpen(true)}
        products={products}
      />
      <CreditCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPayment={handlePayment}
      />
      {showPaymentSummary && (
        <PaymentSummary onConfirmPayment={confirmPayment} />
      )}
      {paymentError && <Notification message={paymentError} type='error' />}
    </>
  );
};

export default ProductDetails;
