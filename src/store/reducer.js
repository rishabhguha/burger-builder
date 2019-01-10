import * as actionTypes from './actions';

const initialState = {
	ingredients : {
		salad:0,
		cheese:0,
		bacon:0,
		meat:0
	},
	totalPrice: 5
};

const PRICES = {
	salad: 0.5,
	cheese: 0.3,
	bacon: 1.0,
	meat: 2.0
};


const reducer = (state = initialState,action) => {
	switch(action.type) {
		case actionTypes.ADD_INGREDIENT:
			return{
				...state,
				ingredients:{
					...state.ingredients,
					[action.ingredientName] : state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + PRICES[action.ingredientName]
			}
		case actionTypes.REMOVE_INGREDIENT:
		return{
			...state,
			ingredients:{
				...state.ingredients,
				[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
			totalPrice: state.totalPrice - PRICES[action.ingredientName]
		}
	}
	return state;
};

export default reducer;