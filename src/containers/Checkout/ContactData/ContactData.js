import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component{
	state={
		ingredients:this.props.ingredients,
		totalPrice:this.props.price,
		orderform:{
			name: {
				elementType: 'input',
				elementConfig:{
					type: 'text',
					placeholder: 'Your Name'
				},
				value:''
			},
			street: {
				elementType: 'input',
				elementConfig:{
					type: 'text',
					placeholder: 'Street'
				},
				value:''
			},
			pincode: {
				elementType: 'input',
				elementConfig:{
					type: 'text',
					placeholder: 'Pin Code'
				},
				value:''
			},
			email: {
				elementType: 'input',
				elementConfig:{
					type: 'email',
					placeholder: 'Your Email'
				},
				value:''
			},
			orderSpeed: {
				elementType: 'select',
				elementConfig:{
					options:[
					{value:'fastest',displayValue:'Fastest'},
					{value:'cheapest',displayValue:'Cheapest '}
					]
				},
				value:'fastest'
			},
		},
		loading: false
	};

	orderHandler = (event) =>{
		event.preventDefault();
		this.setState({
			loading: true
		});

		const formData = {};
		for(let formElementIdentifier in this.state.orderform)
		{
			formData[formElementIdentifier] = this.state.orderform[formElementIdentifier].value;
		};

		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			orderData: formData
		};

		axios.post('/orders.json',order)
			.then(response => {
				this.setState({
					loading: false,
				});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({
					loading: false
				});
			});
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderform
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};

		updatedFormElement.value = event.target.value;
		console.log(event.target.value);
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({
			orderform: updatedOrderForm
		});
	};

	render(){
		const formElementsArray = [];
		for(let key in this.state.orderform)
		{
			formElementsArray.push({
				id:key,
				config:this.state.orderform[key]
			});
		};

		let form = (<form onSubmit={this.orderHandler}>
					{formElementsArray.map(ele => 
						<Input
						key={ele.id} 
						elementType={ele.config.elementType}
						elementConfig={ele.config.elementConfig}
						value={ele.value}
						changed={(event) => this.inputChangedHandler(event,ele.id)} />
					)}
					<Button btnType='Success'>Order</Button>
				</form>);
		if(this.state.loading){
			form = (<Spinner />);
		}
		return (
			<div className={classes.contactData} >
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
};

export default withRouter(ContactData);