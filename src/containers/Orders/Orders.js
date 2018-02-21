import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/orders.json');
      const orders = [];

      for (let key in response.data) {
        orders.push({
          id: key,
          ...response.data[key]
        });
      }

      this.setState({
        orders,
        loading: false
      });
    } catch (error) {
      this.setState({loading: false});
    }
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
