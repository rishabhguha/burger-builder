import React from 'react';
import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
	return (
		<ul className={classes.navItems}>
			<NavItem link="/">Burger Builder</NavItem>
			<NavItem link="/orders">My Orders</NavItem>
		</ul>
	);
}

export default navigationItems;