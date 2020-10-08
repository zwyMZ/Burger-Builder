import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
let burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  console.log(transformedIngredients.length);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding Ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {/* <BurgerIngredient type="salad"/>
      <BurgerIngredient type="bacon"/>
      <BurgerIngredient type="cheese"/>
      <BurgerIngredient type="meat"/> */}
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
