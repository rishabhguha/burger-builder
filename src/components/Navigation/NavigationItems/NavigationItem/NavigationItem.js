import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.css';

const navItem = (props) => {
	return(
		<li className={classes.navItem}>
			<NavLink 
			activeClassName={classes.active}
			exact
			to={props.link}>{props.children}</NavLink>
		</li>
	);
}

export default navItem;