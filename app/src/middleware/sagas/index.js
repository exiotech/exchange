import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

import erc20TokenABISaga from './ERC20TokenABISaga'

export default function* root() {
  yield all(
    drizzleSagas.map(saga => fork(saga))
  );
  yield fork(erc20TokenABISaga);
}
