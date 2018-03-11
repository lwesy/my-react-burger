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

export const purchaseBurger = orderData => async dispatch => {
  dispatch(purchaseBurgerStart());
  try {
    const {data} = await axios.post('/orders.json', orderData);

    console.log(data);

    dispatch(purchaseBurgerSuccess(data.name, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
};

export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT});
