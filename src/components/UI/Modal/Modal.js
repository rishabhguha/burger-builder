import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {

	shouldComponentUpdate = (nextProps,nextState) => {
		return this.props.show !== nextProps.show || nextProps.children !== this.props.children;
	};

	render() {
		return(
			<>
				<Backdrop show={this.props.show} clicked={this.props.ModalClosed} />
				<div 
				className={classes.Modal}
				style={{
					transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: this.props.show ? '1' : '0'
				}}>
					{this.props.children}
				</div>
			</>
		);
	}
}
	
export default Modal;