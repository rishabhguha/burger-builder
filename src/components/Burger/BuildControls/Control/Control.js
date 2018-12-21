import React from 'react';
import classes from './Control.css';

const control = (props) => (
	<div className={classes.control}>
		<div className={classes.Label}>{props.label}</div>
		<button className={classes.Less} onClick={props.removeIngredient} disabled={props.disabled}>Less</button>
		<button className={classes.More} onClick={props.addIngredient}>More</button>

	</div>
)

export default control;