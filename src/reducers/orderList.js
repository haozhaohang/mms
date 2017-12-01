import * as actionTypes from 'constants/actionTypes'

const initState = {
    list: [],
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    loading: false
}

export default function orderList (state = initState, { type, payload }) {
  switch (type) {
    case actionTypes.ORDER_LIST_SUC: {
        const { list, count, page } = payload

        return {
            ...state,
            list,
            total: count,
            pageIndex: page,
            loading: false
        }
    }

    case actionTypes.ORDER_ADD_LOADING: {
        return {
            ...state,
            loading: true
        }
    }

    default:
        return state
  }
}