import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishMerchantInfo = actionCreator(actionTypes.MERCHANT_INFO_SUC)

export const fetchMerchantInfo = (params ={}) => {
    return async (dispatch) => {
        let payload = {};

        if (params.id) {
            try {
                payload = await get(api.MERCHANT_INFO, params);
            } catch (e) {
                return
            }
        }

       dispatch(finishMerchantInfo(payload))
    }
}

export const fetchMerchantEdit = (params ={}) => {
    const url = params.merchantId ? api.MERCHANT_UPDATE : api.MERCHANT_ADD

    return () => post(url, params);
}




