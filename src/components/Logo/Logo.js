import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
	return (
		<div className={classes.logo}> 
			<img src={burgerLogo} alt="Burger-Builder" />
		</div>
	);
}

export default logo;