import { put, call, takeLatest } from "redux-saga/effects";
import { processPayment } from "../services/PaymentServices";

function* confirmPayment(action) {
  try {
    const paymentResult = yield call(processPayment, action.payload);

    if (paymentResult.success) {
      yield put({ type: "UPDATE_CLIENT_PROGRESS", payload: paymentResult });
      yield put({ type: "PAYMENTS_COMPLETED" });
      yield put({ type: "CONFIRM_PAYMENT_SUCCESS", payload: paymentResult });
      yield put({ type: "SET_LOADING", payload: false });
    } else {
      console.error("Error en el pago:", paymentResult.message);
      yield put({ type: "CONFIRM_PAYMENT_FAILURE", payload: paymentResult });
      yield put({ type: "SET_LOADING", payload: false });
    }
  } catch (error) {
    console.error("Error:", error);
    yield put({ type: "CONFIRM_PAYMENT_FAILURE", payload: error.message });
    yield put({ type: "SET_LOADING", payload: false });
  }
}

export default function* rootSaga() {
  yield takeLatest("CONFIRM_PAYMENT", confirmPayment);
}
