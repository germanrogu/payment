import { combineReducers } from "redux";

const initialClientProgress = {
  isLoggedIn: true,
  cart: [
    {
      id: 1,
      name: "Basic Tee",
      description: "Oversized t-shirt",
      size: "L",
      color: "Black",
      price: 32.2,
    },
  ],
  paymentData: {},
  loading: false,
  paymentsCompleted: 0,
  invoiceNumber: 788152,
  receiptVoucher: "18KU-62IIK",
};

function clientProgressReducer(state = initialClientProgress, action) {
  switch (action.type) {
    case "UPDATE_CLIENT_PROGRESS":
      return {
        ...state,
        loading: { ...action.payload },
      };
    case "PAYMENT_DATA":
      return {
        ...state,
        paymentData: { ...action.payload },
      };
    case "PAYMENTS_COMPLETED":
      return {
        ...state,
        paymentsCompleted: ++state.paymentsCompleted,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  clientProgress: clientProgressReducer,
});

export default rootReducer;
