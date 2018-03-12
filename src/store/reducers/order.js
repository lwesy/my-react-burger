import  * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utils';

const purchaseInit = state => updateObject(state, {purchased: false});

const purchaseBurgerStart = state => updateObject(state, {loading: true});

const purchaseBurgerSuccess = (state, action) => {
  const orders = state.orders.concat({
    ...action.payload.orderData,
    id: action.payload.orderId
  });

  return updateObject(state, {
    orders,
    loading: false,
    purchased: true
  });
};

const purchaseBurgerFail = state => updateObject(state, {loading: false});

const fetchOrdersStart = state => updateObject(state, {loading: true});

const fetchOrdersSuccess = (state, action) => updateObject(state, {
  orders: action.payload.orders,
  loading: false
});

const fetchOrdersFail = state => updateObject(state, {loading: false});

export default (state = {
  orders: [],
  loading: false
}, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
    default: return state;
  }
};
