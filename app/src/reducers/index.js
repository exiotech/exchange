import { combineReducers } from 'redux'
import { drizzleReducers } from 'drizzle'

import { TokenReducer } from './TokenReducer';
import { ExioExChangeReducer } from './ExioExChangeReducer';

const rootReducer = combineReducers({
  ...drizzleReducers,
  currentToken: TokenReducer,
  exioExChange: ExioExChangeReducer,
})

export default rootReducer
