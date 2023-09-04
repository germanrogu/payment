import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreditCardModal from "../components/CreditCardModal";
import PaymentSummary from "../components/PaymentSummary";
import Notification from "../components/common/Notification";
import { processPayment } from "../services/PaymentServices";
import { products } from "../constants/Products";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  //   const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePayment = (info) => {
    processPayment(info)
      .then((response) => {
        setPaymentInfo(info);
        setShowPaymentSummary(true);
        setPaymentError(null);
      })
      .catch((error) => {
        setPaymentError("Error al procesar el pago. Inténtalo de nuevo.");
        setShowPaymentSummary(false);
        setPaymentInfo(null);
      });
  };

  const confirmPayment = () => {
    setShowPaymentSummary(false);
    setPaymentInfo(null);
    navigate("/payment-result?message=Pago exitoso");
  };

  return (
    <>
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
        <PaymentSummary
          paymentInfo={paymentInfo}
          onConfirmPayment={confirmPayment}
        />
      )}
      {paymentError && <Notification message={paymentError} type='error' />}
    </>
  );
};

export default ProductDetails;
