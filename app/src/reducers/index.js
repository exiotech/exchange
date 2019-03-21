import { combineReducers } from 'redux'
import { drizzleReducers } from 'drizzle'

import { TokenReducer } from './TokenReducer';

const rootReducer = combineReducers({
  ...drizzleReducers,
  currentToken: TokenReducer,
})

export default rootReducer
