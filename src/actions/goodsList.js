import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishGoodsList = actionCreator(actionTypes.GOODS_LIST_SUC)
const addLoading = actionCreator(actionTypes.GOODS_ADD_LOADING)

// 门店列表
export const fetchGoodsList = (params ={}) => {
    return async (dispatch) => {
        let payload = {};
        dispatch(addLoading())
        try {
            payload = await get(api.GOODS_LIST, params);
        } catch (e) {
            return
        }

       dispatch(finishGoodsList(payload))
    }
}

// 切换单品状态
export const fetchGoodsChangeStatus = (params = {}) => {
    const url = params.isOn ? api.GOODS_OFF_STATUS : api.GOODS_ON_STATUS

    return async () => await post(url, params)
}

// 单品库存设置
export const fetchGoodsInventory = (params = {}) => {    
    return () => post(api.GOODS_INVENTORY, params)
}