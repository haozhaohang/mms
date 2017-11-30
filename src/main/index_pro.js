import React from 'react'
import ReactDOM from 'react-dom'
//import styles
import 'normalize.css'

import App from './app';
import './index.css'


const render = Component => {
    ReactDOM.render(
        <Component />,
        document.getElementById('root')
    )
}

render(App)