import { combineReducers } from 'redux'
import { drizzleReducers } from 'drizzle'

import { TokenReducer } from './TokenReducer';
import { ExioExChangeReducer } from './ExioExChangeReducer';
import { ERC20TokenABIReducer } from './ERC20TokenABIReducer';

const rootReducer = combineReducers({
  ...drizzleReducers,
  currentToken: TokenReducer,
  exioExChange: ExioExChangeReducer,
  erc20TokenABI: ERC20TokenABIReducer,
})

export default rootReducer
