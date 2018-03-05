import  * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
};

export default (state = {
  ingredients: null,
  totalPrice: 4,
  error: false
}, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
      };
    default:
      return state;
  }
};
