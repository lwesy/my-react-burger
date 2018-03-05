import  * as actionTypes from '../actions/actionTypes';

export default (state = {
  order: [],
  loading: false
}, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        order: state.order.concat({
          ...action.payload.orderData,
          id: action.payload.orderId
        }),
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
