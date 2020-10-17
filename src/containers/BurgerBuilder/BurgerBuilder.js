import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert("you continued!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Mike",
        phone: "7789898812",
        address: "1015-7788 Ackroyd Rd",
        email: "zhangweiyi21@gmail.com",
      },
      deliverMethod: "normal",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => this.setState({ loading: false, purchasing: false }));
  };
  AddIngredientHandler = (type) => {
    const Cnt = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = Cnt;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
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
    this.updatePurchaseState(updatedIngredients);
  };
  render() {
    const disableInfo = { ...this.state.ingredients };

    for (let key in disableInfo) {
      disableInfo[key] = this.state.ingredients[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice.toFixed(2)}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.AddIngredientHandler}
          ingredientRemoved={this.RemoveIngredientHandler}
          disabled={disableInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          purchasing={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder,axios);
