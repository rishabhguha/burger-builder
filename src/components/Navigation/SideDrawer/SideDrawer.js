import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
	let attachedClasses = [classes.sideDrawer,classes.Closed];
	if(props.opened){
		attachedClasses = [classes.sideDrawer,classes.Open];
	}

	return(
		<>
			<Backdrop show={props.opened} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>
				<div className={classes.logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</>
	);
}

export default sideDrawer;