import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
} from "redux-saga/effects";
import { actions } from "./actions";
import req from "../requests/api";
import { URLS } from "../requests/endpoints";
import { ActionsType, ResponseGenerator } from "./types";
import axios from "axios";

function* getItems() {
  try {
    const listItems: ResponseGenerator = yield call(() =>
    req.get(URLS.get.getAllItems()).then((res) => res.data)
    );
    yield put({
      type: actions.HANDLE_ADD_TO_LIST_ITEMS,
      payload: listItems,
    });
  } catch (error: any) {
    alert(error);
  }
}
function* postItems(action: ActionsType) {
  try {
    const postedData: ResponseGenerator = yield call(() =>req.post(URLS.post.postAllItems(),action.payload)
    );
    yield put({
      type: actions.HANDLE_ADD_TO_LIST_ITEMS,
      payload: postedData.data,
    });
  } catch (error: any) {
    alert(error);
  }
}

function* getListItems() {
  yield takeLatest(actions.HANDLE_GET_DATA, getItems);
}
function* postListItems() {
  yield takeEvery(actions.HANDLE_POST_DATA, postItems);
}

export default function* rootSaga() {
  yield all([getListItems(), postListItems()]);
}
