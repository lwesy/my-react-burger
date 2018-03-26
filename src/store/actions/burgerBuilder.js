import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

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

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: {
    ingredients
  }
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => async dispatch => {
  try {
    const {data} = await axios.get('https://my-react-burger-bc71f.firebaseio.com/ingredients.json');

    dispatch(setIngredients(data));
  } catch (error) {
    dispatch(fetchIngredientsFailed());
  }
};
