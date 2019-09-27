// @flow

import { fork, all } from 'redux-saga/effects';
import {
  walletSaga,
} from '../modules';

export default function* rootSaga() {
  yield all([
    fork(walletSaga),
  ]);
}
