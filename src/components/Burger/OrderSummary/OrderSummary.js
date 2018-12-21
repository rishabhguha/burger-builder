import React from 'react';
 import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
	.map(igKey => {
		return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li> 
	})

	return (
		<>
			<h3>Your Order</h3>
			<p>Delicious burger with the following ingredients</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p style={{textAlign:'center',fontWeight:'bold'}}>Total price is : {props.price.toFixed(2)}</p>
			<p>Continue to Checkout</p>
			<Button clicked={props.cancelled} btnType='Danger'>CANCEL</Button>
			<Button clicked={props.continued} btnType='Success'>CONTINUE</Button>

		</>
	);
}

export default orderSummary;