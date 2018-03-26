import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: {
    orderId,
    orderData
  }
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  payload: {
    error
  }
});

export const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_BURGER_START});

export const purchaseBurger = (orderData, token) => async dispatch => {
  dispatch(purchaseBurgerStart());
  try {
    const {data} = await axios.post(`/orders.json?auth=${token}`, orderData);

    dispatch(purchaseBurgerSuccess(data.name, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
};

export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT});

export const fetchOrdersStart = () => ({type: actionTypes.FETCH_ORDERS_START});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: {
    orders
  }
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload: {
    error
  }
});

export const fetchOrders = token => async dispatch => {
  dispatch(fetchOrdersStart());
  try {
    const response = await axios.get(`/orders.json?auth=${token}`);
    const orders = [];

    for (let key in response.data) {
      orders.push({
        id: key,
        ...response.data[key]
      });
    }

    dispatch(fetchOrdersSuccess(orders));
  } catch (error) {
    dispatch(fetchOrdersFail(error));
  }
};
