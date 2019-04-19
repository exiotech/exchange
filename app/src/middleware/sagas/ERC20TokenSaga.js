import { put, call, takeEvery } from 'redux-saga/effects';

import actions from '../../actions';
import client from '../../services/clients/ApiClient';
// import web3 from '../../services/clients/Web3Client';
import { API_OPTIONS_GET_CONTRACT_ABI } from '../../consts'

function* getErc20TokenAbi() {
  try {
    yield put(actions.requestedErc20TokenAbi());
    const data = yield call(() => {
      return client.get('/', {
        params: API_OPTIONS_GET_CONTRACT_ABI,
      })
        .then((res) => {
          return res.data.result;
        });
      }
    );
    yield put(actions.requestedErc20TokenAbiSucceeded(data));
  } catch (error) {
    yield put(actions.requestedErc20TokenAbiFailed());
  }
}

function* erc20TokenABISaga () {
  yield takeEvery('SET_ERC20_TOKEN_ADDRESS', getErc20TokenAbi);
}

export default erc20TokenABISaga;
