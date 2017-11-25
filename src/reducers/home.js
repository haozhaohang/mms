import * as actionTypes from 'constants/actionTypes'

const initState = {
    goodslList: [],
    merchant: {},
    shopList: [],
    totalNum: 0,
    totalMoney: 0
}

export default function home (state = initState, { type, payload }) {
  switch (type) {
    case actionTypes. HOME_GOODS_LIST_SUC: {
        const { goods_list, merchant } = payload

        return {
            ...state,
            merchant,
            goodslList: goods_list
        }
    }

    default:
        return state
  }
}