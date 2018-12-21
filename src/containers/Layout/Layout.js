import React from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
	state={
		showSideDrawer : false
	};

	sideDrawerClosingHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	};

	sideDrawerOpeningHandler = () => {
		this.setState({
			showSideDrawer: true
		});
	};

	render(){
		return (
			<>
				<Toolbar drawerClosed = {this.sideDrawerOpeningHandler}/> 
				<SideDrawer opened={this.state.showSideDrawer} 
				closed={this.sideDrawerClosingHandler}/> 
				BackDrop
				<main className={classes.content}>
					{this.props.children}
				</main>
			</>
		);
	}
	
}
export default Layout;