import React , { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const PRICES = {
	salad: 0.5,
	cheese: 0.3,
	bacon: 1.0,
	meat: 2.0
};

class BurgerBuilder  extends Component{
	state = {
		ingredients : null,
		totalPrice: 5,
		purchasable: false,
		purchasing:false,
		loading: false
	};

	componentDidMount() {
		axios.get('https://burger-builder-b633d.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({
					ingredients: response.data
				});
			})
			.catch(error => {
				
			});

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
		//alert("continuing!");

		const queryParams = [];
		for (let i in this.state.ingredients)
		{
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		};
		queryParams.push('price=' + this.state.totalPrice);
		
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname:"/checkout",
			search: '?' + queryString
		});
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

		let orderSummary = null;
		let burger = <Spinner />;

		if(this.state.ingredients) {
			burger = 	<>
						<Burger ingredients={this.state.ingredients} />
						<BuildControls 
						addIngredient={this.addIngredientHandler}
						removeIngredient = {this.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						purchasing={this.purchaseHandler} />
						</>;

			orderSummary = <OrderSummary ingredients={this.state.ingredients}
							cancelled={this.purchaseCancelHandler}
							continued={this.purchaseContinueHandler}
							price={this.state.totalPrice}/>;

		}

		if(this.state.loading)
		{
			orderSummary = <Spinner />;
		};

		for(let key in disabledInfo)
		{
			disabledInfo[key] = disabledInfo[key] <= 0;
		};

		return(
			<>
				<Modal show={this.state.purchasing} ModalClosed={this.purchaseCancelHandler}> 
					{orderSummary}
				</Modal> 
				{burger}
			</>
		);
	}
}

export default withErrorHandler(BurgerBuilder,axios);