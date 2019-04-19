import { handleActions } from 'redux-actions';

const initialState = {
  totalSupply: null,
  symbol: null,
  name: null,
  decimals: null,
  abi: null,
  loading: false,
  error: false,
};

export const ERC20TokenReducer = handleActions({
  REQUESTED_ERC20_TOKEN_ABI: (state, action) => {
    return {
      ...state,
      abi: null,
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
      abi: null,
      loading: false,
      error: false
    }
  },

  SET_ERC20_TOKEN_ADDRESS: (state, action) => {
    return {
      ...state,
      address: action.payload.address,
      loading: false,
      error: false
    }
  },

  SET_ERC20_TOKEN_TOTAL_SUPPLY: (state, action) => {
    return {
      ...state,
      totalSupply: action.payload.totalSupply,
    }
  },

  SET_ERC20_TOKEN_SYMBOL: (state, action) => {
    return {
      ...state,
      symbol: action.payload.symbol,
    }
  },

  SET_ERC20_TOKEN_NAME: (state, action) => {
    return {
      ...state,
      name: action.payload.name,
    }
  },

  SET_ERC20_TOKEN_DECIMALS: (state, action) => {
    return {
      ...state,
      decimals: action.payload.decimals,
    }
  },
}, initialState);
