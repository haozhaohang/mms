import * as actionTypes from 'constants/actionTypes'

const initState = {
    info: {}
}

export default function merchantEdit (state = initState, { type, payload }) {
  switch (type) {
    case actionTypes.MERCHANT_INFO_SUC: {
        const { merchant_info } = payload

        return {
            ...state,
            info: merchant_info
        }
    }

    default:
        return state
  }
}