import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/PaymentResult.css";

function PaymentResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionResult = searchParams.get("message");

  const { paymentsCompleted, cart } = useSelector(
    (state) => state.clientProgress
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch({ type: "RESET_PAYMENT_DATA" });
    dispatch({ type: "RESET_CONFIRMATION_SUCCESS" });
    navigate("/");
  };

  return (
    <div className='payment-result'>
      <h2>Transaction Result</h2>
      <p>{transactionResult}</p>
      <div>
        <h3>Order Details:</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Price: ${item.price}
            </li>
          ))}
        </ul>
        <p>Payments completed: {paymentsCompleted}</p>
      </div>

      <button onClick={handleReset}>Repurchase</button>
    </div>
  );
}

export default PaymentResult;
