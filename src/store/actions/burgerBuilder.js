import * as actionTypes from './actionTypes';

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: {
    ingredientName
  }
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: {
    ingredientName
  }
});
