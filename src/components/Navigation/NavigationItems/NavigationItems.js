import React from 'react';
import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
	return (
		<ul className={classes.navItems}>
			<NavItem link="/" active>Burger Builder</NavItem>
			<NavItem link="/">Checkout</NavItem>
		</ul>
	);
}

export default navigationItems;