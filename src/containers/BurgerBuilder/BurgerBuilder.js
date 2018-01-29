import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
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
    purchasable: false,
    purchasing: false
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

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = async () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Liam Wohlfart',
        address: {
          street: 'Examplestreet 12',
          zipcode: '21335',
          country: 'Germany'
        },
        email: 'lorem@ipsum.com'
      },
      deliveryMethod: 'fastest'
    };

    try {
      const response = await axios.post('/orders.json', order);

      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const disabled = { ...this.state.ingredients };

    for (const key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseContinued={this.purchaseContinueHandler}
            purchaseCanceled={this.purchaseCancelHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabled}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />          
      </Fragment>
    );
  }
}

export default BurgerBuilder;
