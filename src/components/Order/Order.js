import React from 'react';

import classes from './Order.css';

const order = (props) => {
	const ingredients = [];
	for (let ingredientName in props.ingredients)
	{
		ingredients.push(
			{name:ingredientName,
			amount:props.ingredients[ingredientName]}
			)
	};

	const ingredientOutput = ingredients.map(ing => {
		return <span key={ing.name} 
		style={{textTransform:'capitalize',
			display:'inline-block',
			margin: '0 8px',
			border: 'solid 1px #ccc',
			padding: '5px'
		}}
		>{ing.name} : {ing.amount}</span>;
	});

	return(
		<div className={classes.order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>PRICE <strong>USD {props.price.toFixed(2)}</strong></p>
		</div>
	);
}

export default order;