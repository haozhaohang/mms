import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import rootReducer from 'reducers'

export default function createStoreByInitState(initState = {}) {
    const store = createStore(rootReducer, initState, applyMiddleware(thunk))

    return store
}