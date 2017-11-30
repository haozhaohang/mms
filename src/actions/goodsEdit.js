import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishGoodsInfo = actionCreator(actionTypes.GOODS_INFO_SUC)
const finishGoodsCategory = actionCreator(actionTypes.GOODS_CATEGORY_SUC)

export const fetchGoodsInfo = (params ={}) => {
    return async (dispatch) => {
        let payload = {};

        if (params.id) {
            try {
                payload = await get(api.GOODS_INFO, params);
            } catch (e) {
                return
            }
            
            dispatch(finishGoodsInfo(payload))
        }
    }
}

export const fetchGoodsEdit = (params ={}) => {
    const url = params.merchantId ? api.GOODS_UPDATE : api.GOODS_ADD

    return () => post(url, params);
}

// 商品分类列表
export const fetchGoodsCategory = (params ={}) => {
    return async (dispatch) => {
        let payload = {};

        try {
            payload = await get(api.CATEGORY_LIST, params);
        } catch (e) {
            return
        }

       dispatch(finishGoodsCategory(payload))
    }
}
