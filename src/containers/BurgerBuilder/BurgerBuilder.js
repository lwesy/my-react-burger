import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    this.setState(({
      ingredients,
      totalPrice
    }) => {
      return {
        ingredients: {
          ...ingredients,
          [type]: ingredients[type] + 1
        },
        totalPrice: totalPrice + INGREDIENT_PRICES[type]
      }
    });
  }

  removeIngredient = (type) => {
    
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} />          
      </Fragment>
    );
  }
}

export default BurgerBuilder;
