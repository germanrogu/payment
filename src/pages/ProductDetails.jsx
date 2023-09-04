import React, { useState } from "react";
import Product from "../components/Product";
import "../styles/ProductDetails.css";
import CreditCardModal from "../components/CreditCardModal";
import PaymentSummary from "../components/PaymentSummary";
import Notification from "../components/common/Notification";
import { processPayment } from "../services/PaymentServices";

const products = [
  {
    name: "Producto 1",
    description: "Descripción del Producto 1",
    price: 19.99,
  },
  {
    name: "Producto 2",
    description: "Descripción del Producto 2",
    price: 29.99,
  },
];

const ProductDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
  };

  return (
    <div className='Product'>
      <h1>Tienda</h1>
      <button onClick={openModal}>Paga con tarjeta de crédito</button>
      <div className='product-list'>
        {products.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
      <CreditCardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onPayment={handlePayment}
      />
      {showPaymentSummary && (
        <PaymentSummary
          paymentInfo={paymentInfo}
          onConfirmPayment={confirmPayment}
        />
      )}
      {paymentError && <Notification message={paymentError} type='error' />}
    </div>
  );
};

export default ProductDetails;
