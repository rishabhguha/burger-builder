import React , { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const PRICES = {
	salad: 0.5,
	cheese: 0.3,
	bacon: 1.0,
	meat: 2.0
};

class BurgerBuilder  extends Component{
	state = {
		ingredients : {
			salad: 0,
			cheese: 0,
			bacon: 0,
			meat: 0
		},
		totalPrice: 5,
		purchasable: false,
		purchasing:false
	};

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(igKey => (ingredients[igKey]))
			.reduce((sum,ele) => {
				return sum + ele;
			},0);

		this.setState({
			purchasable: sum > 0 
		});
	};

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	};

	purchaseContinueHandler = () => {
		alert("continuing!");
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	}

	addIngredientHandler = type => {
		const oldIngredientCount = this.state.ingredients[type];
		const newIngredientCount = oldIngredientCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newIngredientCount;
		const priceAddition = PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice:newPrice,
			ingredients:updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldIngredientCount = this.state.ingredients[type];
		const newIngredientCount = oldIngredientCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newIngredientCount;
		const priceDeduction = PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			totalPrice:newPrice,
			ingredients:updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	render(){
		const disabledInfo = {
			...this.state.ingredients
		};

		for(let key in disabledInfo)
		{
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return(
			<>
				<Modal show={this.state.purchasing} ModalClosed={this.purchaseCancelHandler}> 
					<OrderSummary ingredients={this.state.ingredients}
					cancelled={this.purchaseCancelHandler}
					continued={this.purchaseContinueHandler}
					price={this.state.totalPrice}/>
				</Modal> 
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
				addIngredient={this.addIngredientHandler}
				removeIngredient = {this.removeIngredientHandler}
				disabled={disabledInfo}
				price={this.state.totalPrice}
				purchasable={this.state.purchasable}
				purchasing={this.purchaseHandler} />
			</>
		);
	}
}

export default BurgerBuilder;