import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 1.0,
  cheese: 1.5,
  meat: 3.0,
  bacon: 2.0,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    totalPrice: 2,
  };

  AddIngredientHandler = (type) => {
    const Cnt = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = Cnt;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };
  RemoveIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const Cnt = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = Cnt;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };
  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = this.state.ingredients[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.AddIngredientHandler}
          ingredientRemoved={this.RemoveIngredientHandler}
          disabled = {disableInfo}
          price = {this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
