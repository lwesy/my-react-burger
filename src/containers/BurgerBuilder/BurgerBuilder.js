import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('https://my-react-burger-bc71f.firebaseio.com/Ingredients.json');

      this.setState({
        ingredients: data
      });
    } catch (error) {
      this.setState({
        error: true
      });
    }
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
    // this.setState({
    //   loading: true
    // });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Liam Wohlfart',
    //     address: {
    //       street: 'Examplestreet 12',
    //       zipcode: '21335',
    //       country: 'Germany'
    //     },
    //     email: 'lorem@ipsum.com'
    //   },
    //   deliveryMethod: 'fastest'
    // };

    // try {
    //   await axios.post('/orders.json', order);

    //   this.setState({
    //     loading: false,
    //     purchasing: false
    //   });
    // } catch (error) {
    //   this.setState({
    //     loading: false,
    //     purchasing: false
    //   });
    // }

    this.props.history.push('/checkout');
  }

  render() {
    const disabled = { ...this.state.ingredients };
    let burger = this.state.error ? <p>Ingredients can't load!</p> : <Spinner />;
    let orderSummary = null;

    for (const key in disabled) {  
      disabled[key] = disabled[key] <= 0;
    }

    if (this.state.ingredients) {
      burger = (
        <Fragment>
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

      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseContinued={this.purchaseContinueHandler}
        purchaseCanceled={this.purchaseCancelHandler}
        price={this.state.totalPrice}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
