import * as actionTypes from 'constants/actionTypes'

const initState = {
    info: {}
}

export default function categoryEdit (state = initState, { type, payload }) {
  switch (type) {
    case actionTypes.CATEGORY_INFO_SUC: {
        const { category_info } = payload

        return {
            ...state,
            info: category_info
        }
    }

    default:
        return state
  }
}