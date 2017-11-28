import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishCategoryInfo = actionCreator(actionTypes.CATEGORY_INFO_SUC)

export const fetchCategoryInfo = (params ={}) => {
    return async (dispatch) => {
        let payload = {};

        if (params.id) {
            try {
                payload = await get(api.CATEGORY_INFO, params);
            } catch (e) {
                return
            }
        }

       dispatch(finishCategoryInfo(payload))
    }
}

export const fetchCategoryEdit = (params ={}) => {
    const url = params.id ? api.CATEGORY_UPDATE : api.CATEGORY_ADD
    console.log(params)
    return () => post(url, params);
}
