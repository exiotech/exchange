import {handleActions} from 'redux-actions';

const initialState = {
  tokenAddress: null,
};

export const TokenReducer = handleActions({
    setTokenAddress: (state, { payload: { address } }) => {
      console.log('ADDRESS', address)
        return {
            ...state,
            tokenAddress: address,
        };
    },
}, initialState);
