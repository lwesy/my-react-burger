import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    totalPrice: 4,
    purchasable: false
  }

  updatePurchasableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .reduce((sum, el) => sum + ingredients[el], 0);

    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = (type) => {
    const ingredients = { 
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1
    };

    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
        ingredients,
        totalPrice
      });
    
    this.updatePurchasableState(ingredients);
  }

  removeIngredientHandler = (type) => {
    const ingredients = { 
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] - 1
    };

    const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    if (ingredients[type] < 0) {
      return false;
    }

    this.setState({
      ingredients,
      totalPrice
    });

    this.updatePurchasableState(ingredients);
  }

  render() {
    const disabled = { ...this.state.ingredients };

    for (const key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    return (
      <Fragment>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabled}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />          
      </Fragment>
    );
  }
}

export default BurgerBuilder;
