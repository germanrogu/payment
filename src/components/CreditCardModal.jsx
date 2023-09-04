import React, { useState } from "react";
import "../styles/CreditModal.css";

function CreditCardModal({ isOpen, onClose, onPayment }) {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onPayment(cardInfo);
    onClose();
  };

  return (
    <div className={`credit-card-modal ${isOpen ? "open" : ""}`}>
      <div className='modal-content'>
        <span className='close-button' onClick={onClose}>
          &times;
        </span>
        <h2>Ingrese los detalles de su tarjeta de crédito</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='number'
            placeholder='Número de tarjeta'
            value={cardInfo.number}
            onChange={handleInputChange}
            required
          />
          <input
            type='text'
            name='name'
            placeholder='Nombre del titular'
            value={cardInfo.name}
            onChange={handleInputChange}
            required
          />
          <input
            type='text'
            name='expiry'
            placeholder='Fecha de expiración (MM/YY)'
            value={cardInfo.expiry}
            onChange={handleInputChange}
            required
          />
          <input
            type='text'
            name='cvc'
            placeholder='CVC'
            value={cardInfo.cvc}
            onChange={handleInputChange}
            required
          />
          <button type='submit'>Pagar</button>
        </form>
      </div>
    </div>
  );
}

export default CreditCardModal;
