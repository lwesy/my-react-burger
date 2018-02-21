import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = async (event) => {
    event.preventDefault();

    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      await axios.post('/orders.json', order);
      this.setState({loading: false});
      this.props.history.push('/');
    } catch (error) {
      this.setState({loading: false});
    }
  }

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button
          btnType="Success"
          clicked={this.orderHandler} y
        >ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
