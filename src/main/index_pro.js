import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import 'babel-polyfill'
//import styles
import 'normalize.css'

import rootReducer from 'reducers'
import RouteTree from './router'
import './index.css'

let store = createStore(rootReducer, {}, applyMiddleware(thunk))

const render = Component => {
    ReactDOM.render(
            <Provider store={store}>
                <Component />
            </Provider>,
        document.getElementById('root')
    )
}

render(RouteTree)