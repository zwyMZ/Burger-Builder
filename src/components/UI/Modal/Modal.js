import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary/Auxilary";
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.show!==this.props.show){
      return true;
    }
  }
  render() {
    return (
      <Aux>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
      </Aux>
    );
  }
}

export default Modal;
