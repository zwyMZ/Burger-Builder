import React from "react";
import Aux from '../../hoc/Auxilary';
import classess from './Layout.module.css';
const Layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer,Backdrop</div>
    <main className = {classess.Content}>{props.children}</main>
  </Aux>
);


export default Layout;