import React from "react";
import LOGO from "../assets/ce_logo.gif";
import {Menu} from "semantic-ui-react";


const Header = props => (
  <div id="header">
    <div>
      <img src={LOGO} alt="computer-exchange_logo" />
    </div>
    <div>
      <span>Rental Inventory Management</span>
    </div>
    <div>
      <img src={LOGO} alt="computer-exchange_logo" />
    </div>
  </div>
);

export default Header;