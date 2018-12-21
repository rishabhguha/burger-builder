import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = (props) => (
	<header className={classes.toolbar}>
		<DrawerToggle clicked={props.drawerClosed} />
		<div className={classes.logo}>
			<Logo />
		</div>
		<nav className={classes.desktopOnly} >
			<NavigationItems />
		</nav>
	</header>
);

export default toolbar;