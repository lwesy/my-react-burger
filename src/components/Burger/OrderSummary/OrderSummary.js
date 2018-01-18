import React, { Fragment } from 'react';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}: {props.ingredients[igKey]}</span>
      </li>
    ))

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
    </Fragment>
  );
};

export default orderSummary;
