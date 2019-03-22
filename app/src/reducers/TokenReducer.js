import {handleActions} from 'redux-actions';

const initialState = {
  tokenAddress: null,
  balance: null,
};

export const TokenReducer = handleActions({
  SET_TOKEN_ADDRESS: (state, { payload: { address } }) => {
    return {
      ...state,
      address,
    };
  },

  GET_BALANCE_OF_TOKEN: (state, { payload: { balance } }) => {
    return {
      ...state,
      balance,
    }
  },

}, initialState);
