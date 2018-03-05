import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderID, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: {
    orderID,
    orderData
  }
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  payload: {
    error
  }
});

export const purchaseBurgerStart = orderData => async dispatch => {
  try {
    const {data} = await axios.post('/orders.json', orderData);

    console.log(data);

    dispatch(purchaseBurgerSuccess(data, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
};
