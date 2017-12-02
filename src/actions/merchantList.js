import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishMerchantList = actionCreator(actionTypes.MERCHANT_LIST_SUC)
const addLoading = actionCreator(actionTypes.MERCHANT_ADD_LOADING)
const removeLoading = actionCreator(actionTypes.MERCHANT_REMOVE_LOADING)

// 门店列表
export const fetchMerchantList = (params ={}) => {
    return async (dispatch) => {
        let payload = {};
        dispatch(addLoading())
        try {
            payload = await get(api.MERCHANT_LIST, params);
        } catch (e) {
            dispatch(removeLoading())
            return
        }

       dispatch(finishMerchantList(payload))
    }
}

// 切换门店状态
export const fetchMerchantChangeStatus = (params = {}) => {
    const url = params.isOn ? api.MERCHANT_OFF_STATUS : api.MERCHANT_ON_STATUS

    return async () => await post(url, params)
}


