import React from 'react';
import classes from './NavigationItem.css';

const navItem = (props) => {
	return(
		<li className={classes.navItem}>
			<a className={props.active ? classes.active : null} href={props.link}>{props.children}</a>
		</li>
	);
}

export default navItem;