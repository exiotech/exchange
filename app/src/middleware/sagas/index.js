import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

import erc20TokenSaga from './ERC20TokenSaga'

export default function* root() {
  yield all(
    drizzleSagas.map(saga => fork(saga))
  );
  yield fork(erc20TokenSaga);
}
