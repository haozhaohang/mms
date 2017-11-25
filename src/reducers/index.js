import { combineReducers } from 'redux'

import user from './user'
import menu from './menu'
import merchantList from './merchantList'

const rootReducer = combineReducers({
    user,
    menu,
    merchantList
})

export default rootReducer