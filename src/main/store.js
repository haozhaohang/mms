import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootReducer from 'reducers'

export default function createStoreByInitState(initState = {}, history) {
    const middlewares = [thunk, routerMiddleware(history)];

    const store = createStore(
        combineReducers({
            ...rootReducer,
            router: routerReducer
        }),
        initState,
        applyMiddleware(...middlewares)
    )

    return store
}