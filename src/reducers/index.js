import { combineReducers } from 'redux'

import user from './user'
import menu from './menu'
import merchantList from './merchantList'
import merchantEdit from './merchantEdit'

import orderList from './orderList'

const rootReducer = combineReducers({
    user,
    menu,
    merchantList,
    merchantEdit,
    orderList
})

export default rootReducer