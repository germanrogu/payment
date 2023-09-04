import React, { useEffect, useState } from "react";
import "../styles/CreditModal.css";
import { useDispatch } from "react-redux";
import mastercardImage from "../assets/mastercard-logo.webp";
import visaImage from "../assets/visa-logo.webp";
import creditCardType from "credit-card-type";

function CreditCardModal({ isOpen, onClose, onPayment }) {
  const dispatch = useDispatch();
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cardType, setCardType] = useState("visa");
  const [validationErrors, setValidationErrors] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    if (!dataLoaded) {
      const savedData = localStorage.getItem("creditCardData");
      if (savedData) {
        setCardInfo(JSON.parse(savedData));
      }

      setDataLoaded(true);
    }
  }, [dataLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });

    localStorage.setItem(
      "creditCardData",
      JSON.stringify({
        ...cardInfo,
        [name]: value,
      })
    );

    if (name === "number") {
      const validationResult = validateCardNumber(value);
      const cardTypes = creditCardType(value);
      if (cardTypes.length > 0) {
        setCardType(cardTypes[0].type);
      } else {
        setCardType(null);
      }
      if (!validationResult.valid) {
        setValidationErrors({
          ...validationErrors,
          number: "Invalid Card Number",
        });
      } else {
        setValidationErrors({ ...validationErrors, number: "" });
      }
    } else if (name === "expiry") {
      const expiryValidationResult = validateExpiryDate(value);
      if (!expiryValidationResult.valid) {
        setValidationErrors({
          ...validationErrors,
          expiry: "Invalid Expire Date",
        });
      } else {
        setValidationErrors({ ...validationErrors, expiry: "" });
      }
    } else if (name === "cvv") {
      const cvcValidationResult = validateCVC(value);
      if (!cvcValidationResult.valid) {
        setValidationErrors({ ...validationErrors, cvv: "Invalid CVV" });
      } else {
        setValidationErrors({ ...validationErrors, cvv: "" });
      }
    }
  };

  const validateCardNumber = (number) => {
    const cardNumberRegex = /^[0-9]{13,19}$/;
    return {
      valid: cardNumberRegex.test(number),
    };
  };

  const validateExpiryDate = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    return {
      valid: expiryRegex.test(expiry),
    };
  };

  const validateCVC = (cvv) => {
    const cvcRegex = /^\d{3,4}$/;
    return {
      valid: cvcRegex.test(cvv),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const numberValidation = validateCardNumber(cardInfo.number);
    const expiryValidation = validateExpiryDate(cardInfo.expiry);
    const cvcValidation = validateCVC(cardInfo.cvv);

    if (!numberValidation.valid) {
      setValidationErrors({
        ...validationErrors,
        number: "Invalid Card Number",
      });
    } else if (!expiryValidation.valid) {
      setValidationErrors({
        ...validationErrors,
        expiry: "Invalid Expire Date",
      });
    } else if (!cvcValidation.valid) {
      setValidationErrors({ ...validationErrors, cvv: "Invalid CVV" });
    } else {
      dispatch({ type: "PAYMENT_DATA", payload: cardInfo });
      onPayment();
      onClose();
    }
  };

  return (
    <div className={`credit-card-modal ${isOpen ? "open" : ""}`}>
      <div className='modal-content'>
        <span className='close-button' onClick={onClose}>
          &times;
        </span>
        <h2>Pay with Credit Card</h2>
        <form onSubmit={handleSubmit}>
          <div className='card-number-input'>
            <input
              type='text'
              name='number'
              placeholder='Card Number'
              value={cardInfo.number}
              onChange={handleInputChange}
              required
            />
            {cardType !== "visa" ? (
              <img src={mastercardImage} alt='MasterCard' className='logo' />
            ) : cardType === "visa" ? (
              <img src={visaImage} alt='Visa' className='logo' />
            ) : null}
          </div>
          {validationErrors.number && (
            <p className='error'>{validationErrors.number}</p>
          )}
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={cardInfo.name}
            onChange={handleInputChange}
            required
          />

          <input
            type='text'
            name='expiry'
            placeholder='Expiry Date (MM/YY)'
            value={cardInfo.expiry}
            onChange={handleInputChange}
            required
          />
          {validationErrors.expiry && (
            <p className='error'>{validationErrors.expiry}</p>
          )}

          <input
            type='text'
            name='cvv'
            placeholder='CVV'
            value={cardInfo.cvv}
            onChange={handleInputChange}
            required
          />
          {validationErrors.cvv && (
            <p className='error'>{validationErrors.cvv}</p>
          )}

          <button type='submit'>Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default CreditCardModal;
