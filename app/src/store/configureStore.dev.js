import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import api from '../middleware/api'

import rootSaga from '../rootSaga'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger(), sagaMiddleware),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
