import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishOrderList = actionCreator(actionTypes.ORDER_LIST_SUC)
const addLoading = actionCreator(actionTypes.ORDER_ADD_LOADING)
const removeLoading = actionCreator(actionTypes.ORDER_REMOVE_LOADING)

// 订单列表
export const fetchOrderList = (params ={}) => {
    return async (dispatch) => {
        let payload = {};
        dispatch(addLoading())
        try {
            payload = await get(api.ORDER_LIST, params);
        } catch (e) {
            dispatch(removeLoading())
            return
        }

       dispatch(finishOrderList(payload))
    }
}

// 订单退款
export const fetchRefund = (params = {}) => {
    return () => post(api.ORDER_REFUND, params);
}


// 重打单
export const fetchRepeatPrint= (params = {}) => {
    return () => post(api.ORDER_PRINT, params);
}


