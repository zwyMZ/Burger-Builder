import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary";
const modal = (props) => (
<Aux>
<div
    className={classes.Modal}
    style={{
      transform: props.show ? "translateY(0)" : "translateY(-100vh)",
      opacity: props.show ? "1" : "0",
    }}
  >
    {props.children}
  </div>
  <Backdrop show={props.show} clicked={props.modalClosed}/>
</Aux>
);

export default modal;
