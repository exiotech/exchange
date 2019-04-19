import { combineReducers } from 'redux'
import { drizzleReducers } from 'drizzle'

import { TokenReducer } from './TokenReducer';
import { ExioExChangeReducer } from './ExioExChangeReducer';
import { ERC20TokenReducer } from './ERC20TokenReducer';

const rootReducer = combineReducers({
  ...drizzleReducers,
  currentToken: TokenReducer,
  exioExChange: ExioExChangeReducer,
  erc20Token: ERC20TokenReducer,
})

export default rootReducer
