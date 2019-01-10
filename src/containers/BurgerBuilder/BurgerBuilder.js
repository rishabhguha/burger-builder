import React , { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder  extends Component{
	state = {
		purchasing:false,
		loading: false
	};

	componentDidMount() {
		// axios.get('https://burger-builder-b633d.firebaseio.com/ingredients.json')
		// 	.then(response => {
		// 		this.setState({
		// 			ingredients: response.data
		// 		});
		// 	})
		// 	.catch(error => {
				
		// 	});

	};

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(igKey => (ingredients[igKey]))
			.reduce((sum,ele) => {
				return sum + ele;
			},0);

		return sum > 0;
		
	};

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	};

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	}

	render(){
		const disabledInfo = {
			...this.props.ings
		};

		let orderSummary = null;
		let burger = <Spinner />;

		if(this.props.ings) {
			burger = 	<>
						<Burger ingredients={this.props.ings} />
						<BuildControls 
						addIngredient={this.props.onIngredientAdded}
						removeIngredient = {this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchaseState(this.props.ings)}
						purchasing={this.purchaseHandler} />
						</>;

			orderSummary = <OrderSummary ingredients={this.props.ings}
							cancelled={this.purchaseCancelHandler}
							continued={this.purchaseContinueHandler}
							price={this.props.price}/>;

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
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
		onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
	}
}

const mapStateToProps = state => {
	return{
		ings: state.ingredients,
		price: state.totalPrice
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));