import * as actionTypes from 'constants/actionTypes'

const initState = {
    list: [],
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    loading: false
}

export default function merchantList (state = initState, { type, payload }) {
  switch (type) {
    case actionTypes.MERCHANT_LIST_SUC: {
        const { list, count, page } = payload

        return {
            ...state,
            list,
            total: count,
            pageIndex: page,
            loading: false
        }
    }

    case actionTypes.MERCHANT_ADD_LOADING: {
        return {
            ...state,
            loading: true
        }
    }

    default:
        return state
  }
}