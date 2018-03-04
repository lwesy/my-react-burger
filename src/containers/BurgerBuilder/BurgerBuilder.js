import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  // async componentDidMount() {
  //   try {
  //     const { data } = await axios.get('https://my-react-burger-bc71f.firebaseio.com/Ingredients.json');

  //     this.setState({
  //       ingredients: data
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error: true
  //     });
  //   }
  // }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .reduce((sum, el) => sum + ingredients[el], 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabled = {...this.props.ingredients};
    let burger = this.state.error ? <p>Ingredients can't load!</p> : <Spinner />;
    let orderSummary = null;

    for (const key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabled}
            price={this.props.price}
            purchasable={this.updatePurchasableState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        purchaseContinued={this.purchaseContinueHandler}
        purchaseCanceled={this.purchaseCancelHandler}
        price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: name => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      payload: {
        ingredientName: name
      }
    }),
    onIngredientRemoved: name => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      payload: {
        ingredientName: name
      }
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
