import { handleActions } from 'redux-actions';

const initialState = {
  beneficiaresAddresses: [],
  loading: false,
  error: false,
};

export const ERC20TokenABIReducer = handleActions({
  REQUESTED_BENEFICIARES_ADDRESSES: (state, action) => {
    return {
      ...state,
      beneficiaresAddresses: [],
      loading: true,
      error:false,
    }
  },

  REQUESTED_BENEFICIARES_ADDRESSES_SUCCEEDED: (state, action) => {
    return {
      ...state,
      beneficiaresAddresses: action.payload.beneficiaresAddrsses,
      loading: false,
      error: false
    }
  },


  REQUESTED_BENEFICIARES_ADDRESSES_FAILED: (state, action) => {
    return {
      ...state,
      beneficiaresAddresses: [],
      loading: false,
      error: false
    }
  },
}, initialState);
