import { combineReducers } from 'redux'

import user from './user'
import menu from './menu'
import merchantList from './merchantList'
import merchantEdit from './merchantEdit'

const rootReducer = combineReducers({
    user,
    menu,
    merchantList,
    merchantEdit
})

export default rootReducer