import React from 'react';
import Control from './Control/Control';
import classes from './BuildControls.css';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
	<div className={classes.buildControls}>
		<p>Current Price : <strong>{props.price.toFixed(2)}</strong> </p>
		{controls.map(ctrl => 
			<Control 
			key={ctrl.label} 
			label={ctrl.label}
			addIngredient={() => props.addIngredient(ctrl.type)}
			removeIngredient = {() => props.removeIngredient(ctrl.type)}
			disabled = {props.disabled[ctrl.type]}
			 />
		)}
		<button className={classes.OrderButton} 
		disabled={!props.purchasable} 
		onClick={props.purchasing}
		>ORDER NOW</button>
	</div>
);

export default buildControls;