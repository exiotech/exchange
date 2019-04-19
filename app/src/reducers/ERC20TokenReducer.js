import { handleActions } from 'redux-actions';

const initialState = {
  abi: '',
  loading: false,
  error: false,
};

export const ERC20TokenReducer = handleActions({
  REQUESTED_ERC20_TOKEN_ABI: (state, action) => {
    return {
      ...state,
      abi: '',
      loading: true,
      error:false,
    }
  },

  REQUESTED_ERC20_TOKEN_ABI_SUCCEEDED: (state, action) => {
    return {
      ...state,
      abi: action.payload.abi,
      loading: false,
      error: false
    }
  },


  REQUESTED_ERC20_TOKEN_ABI_FAILED: (state, action) => {
    return {
      ...state,
      abi: '',
      loading: false,
      error: false
    }
  },
}, initialState);
