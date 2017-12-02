import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishCategoryList = actionCreator(actionTypes.CATEGROY_LIST_SUC)
const addLoading = actionCreator(actionTypes.CATEGROY_ADD_LOADING)
const removeLoading = actionCreator(actionTypes.CATEGROY_REMOVE_LOADING)

// 商品分类列表
export const fetchCategoryList = (params ={}) => {
    return async (dispatch) => {
        let payload = {};
        dispatch(addLoading())
        try {
            payload = await get(api.CATEGORY_LIST, params);
        } catch (e) {
            dispatch(removeLoading())
            return
        }
       dispatch(finishCategoryList(payload))
    }
}

// 切换分类状态
export const fetchCategoruChangeStatus = (params = {}) => {
    const url = params.isOn ? api.CATEGORY_OFF_STATUS : api.CATEGORY_ON_STATUS

    return async () => await post(url, params)
}


