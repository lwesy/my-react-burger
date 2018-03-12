import  * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utils';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
};

const addIngredient = (state, action) => {
  const ingredients = {
    ...state.ingredients,
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
  };
  const totalPrice = state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName];

  return updateObject(state, {ingredients, totalPrice});
};

const removeIngredient = (state, action) => {
  const ingredients = {
    ...state.ingredients,
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
  };
  const totalPrice = state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName];

  return updateObject(state, {ingredients, totalPrice});
};

const setIngredients = (state, action) => {
  const ingredients = action.payload.ingredients;
  const totalPrice = 4;

  return updateObject(state, {ingredients, totalPrice});
};

const fetchIngredientsFailed = (state, action) =>  updateObject(state, {error: true});

export default (state = {
  ingredients: null,
  totalPrice: 4,
  error: false
}, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
};
