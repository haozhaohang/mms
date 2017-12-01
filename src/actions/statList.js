import * as api from 'constants/api';
import * as actionTypes from 'constants/actionTypes'
import { actionCreator } from 'assets/js/util'
import { get, post } from 'assets/js/request'

const finishStatList = actionCreator(actionTypes.STAT_LIST_SUC)

// 统计列表
export const fetchStatList = (params ={}) => {
    return async (dispatch) => {
        let payload = {};

        try {
            payload = await get(api.STAT_LIST, params);
        } catch (e) {
            return
        }

       dispatch(finishStatList(payload))
    }
}


