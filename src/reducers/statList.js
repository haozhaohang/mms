import * as actionTypes from 'constants/actionTypes'

const initState = {
    netFee: {},
    shop: {},
    goodsList: []
}

export default function statList (state = initState, { type, payload }) {
  switch (type) {
    case actionTypes.STAT_LIST_SUC: {
        const { goods, net_fee, shop } = payload

        return {
            ...state,
            shop,
            netFee: net_fee,
            goodsList: goods
        }
    }

    default:
        return state
  }
}