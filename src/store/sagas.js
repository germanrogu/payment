import { put, takeEvery, call } from "redux-saga/effects";
import { fetchClientProgress } from "../services/fetchClientProgress";

function* loadClientProgress() {
  try {
    const clientProgress = yield call(fetchClientProgress);
    yield put({ type: "UPDATE_CLIENT_PROGRESS", payload: clientProgress });
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeEvery("LOAD_CLIENT_PROGRESS", loadClientProgress);
}
