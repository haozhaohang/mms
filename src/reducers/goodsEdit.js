import * as actionTypes from 'constants/actionTypes'

const initState = {
    info: {},
    categoryList: []
}

export default function goodsEdit (state = initState, { type, payload }) {
  switch (type) {
    case actionTypes.GOODS_INFO_SUC: {
        const { goods_info } = payload

        return {
            ...state,
            info: goods_info
        }
    }

    case actionTypes.GOODS_CATEGORY_SUC: {
        const { list } = payload

        return {
            ...state,
            categoryList: list
        }
    }

    default:
        return state
  }
}