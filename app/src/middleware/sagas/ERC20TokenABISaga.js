import { put, call, takeEvery } from 'redux-saga/effects';

import actions from '../../actions';
import client from '../../services/clients/ApiClient';
// import web3 from '../../services/clients/Web3Client';
import { API_OPTIONS_GET_CONTRACT_ABI } from '../../consts'

function* getBeneficiaresAddresses() {
  try {
    yield put(actions.requestedBeneficiaresAddresses());
    const data = yield call(() => {
      return client.get('/', {
        params: API_OPTIONS_GET_CONTRACT_ABI,
      })
        .then((res) => {
          return res.data.result;
        });
      }
    );
    yield put(actions.requestedBeneficiaresAddressesSucceeded(data));
  } catch (error) {
    yield put(actions.requestedBeneficiaresAddressesFailed());
  }
}

function* erc20TokenABISaga () {
  yield takeEvery('GET_BENEFICIARES_ADDRESSES', getBeneficiaresAddresses);
}

export default erc20TokenABISaga;
